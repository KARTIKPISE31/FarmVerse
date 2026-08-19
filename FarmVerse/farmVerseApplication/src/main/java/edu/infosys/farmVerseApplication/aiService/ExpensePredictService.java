package edu.infosys.farmVerseApplication.aiService;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import edu.infosys.farmVerseApplication.bean.FarmCropInputs;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ExpensePredictService {

    @Value("${huggingface.api.url}")
    private String apiUrl;

    @Value("${huggingface.api.key}")
    private String apiKey;

    @Value("${huggingface.model.id}")
    private String modelId;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public FarmCropInputs predictResourceExpenses(FarmCropInputs cropInputs) {
        try {

            // Treat yield as a regular input property alongside cropId, cropName, etc.
            String prompt = String.format(
                    "You are an agricultural expert system. Based on historical data and crop management standards, " +
                    "calculate the required resources per acre for the provided crop data.\n\n" +
                    "INPUT DATA:\n" +
                    "- Crop ID: %s\n" +
                    "- Crop Name: %s\n" +
                    "- Soil Type: %s\n" +
                    "- Sown Time: %s\n" +
                    "- Harvest Time: %s\n" +
                    "- Yield per Acre: %.2f\n\n" +
                    "INSTRUCTION:\n" +
                    "Based on these parameters, calculate typical per-acre resource requirements. " +
                    "Reply STRICTLY in this four-line key-value format (numeric values only):\n" +
                    "WATER_GALLON: [numeric value for gallons per acre]\n" +
                    "FERTILIZER_KG: [numeric value for kg per acre]\n" +
                    "PESTICIDE_KG: [numeric value for kg per acre]\n" +
                    "TRACTOR_HOUR: [numeric value for hours per acre]",
                    cropInputs.getCropId(),
                    cropInputs.getCropName(),
                    cropInputs.getSoil(),
                    cropInputs.getSownMonthYear(),
                    cropInputs.getHarvestMonthYear(),
                    cropInputs.getYield() != null ? cropInputs.getYield() : 0.0
            );

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(apiKey);

            Map<String, Object> payload = new HashMap<>();
            payload.put("model", modelId);

            List<Map<String, String>> messages = new ArrayList<>();
            messages.add(Map.of("role", "user", "content", prompt));

            payload.put("messages", messages);
            payload.put("max_tokens", 300);

            HttpEntity<Map<String, Object>> entity =
                    new HttpEntity<>(payload, headers);

            ResponseEntity<String> response =
                    restTemplate.postForEntity(apiUrl, entity, String.class);

            // Parse response: choices[0].message.content
            JsonNode root = objectMapper.readTree(response.getBody());

            String resultText = root.path("choices")
                    .get(0)
                    .path("message")
                    .path("content")
                    .asText()
                    .trim();

            // Populate resource prediction fields into the cropInputs object
            parseAndSetPredictedValues(resultText, cropInputs);

            return cropInputs;

        } catch (Exception e) {
            System.err.println(
                    "Error predicting resource expenses: " + e.getMessage()
            );
            return cropInputs;
        }
    }

    private void parseAndSetPredictedValues(
            String rawResponse,
            FarmCropInputs cropInputs) {

        String[] lines = rawResponse.split("\n");

        for (String line : lines) {
            String cleanLine = line.trim();

            if (cleanLine.startsWith("WATER_GALLON:")) {

                String val = cleanLine
                        .replace("WATER_GALLON:", "")
                        .replaceAll("[^0-9.]", "")
                        .trim();

                if (!val.isEmpty())
                    cropInputs.setWaterGallon(Double.parseDouble(val));

            } else if (cleanLine.startsWith("FERTILIZER_KG:")) {

                String val = cleanLine
                        .replace("FERTILIZER_KG:", "")
                        .replaceAll("[^0-9.]", "")
                        .trim();

                if (!val.isEmpty())
                    cropInputs.setFertilizer(Double.parseDouble(val));

            } else if (cleanLine.startsWith("PESTICIDE_KG:")) {

                String val = cleanLine
                        .replace("PESTICIDE_KG:", "")
                        .replaceAll("[^0-9.]", "")
                        .trim();

                if (!val.isEmpty())
                    cropInputs.setPesticides(Double.parseDouble(val));

            } else if (cleanLine.startsWith("TRACTOR_HOUR:")) {

                String val = cleanLine
                        .replace("TRACTOR_HOUR:", "")
                        .replaceAll("[^0-9]", "")
                        .trim();

                if (!val.isEmpty())
                    cropInputs.setTractorHour(Double.parseDouble(val));
            }
        }
    }
}