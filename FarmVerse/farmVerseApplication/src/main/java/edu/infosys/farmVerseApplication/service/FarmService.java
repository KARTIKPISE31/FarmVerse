package edu.infosys.farmVerseApplication.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.infosys.farmVerseApplication.bean.Farm;
import edu.infosys.farmVerseApplication.dao.FarmDao;

@Service
public class FarmService {

    @Autowired
    private FarmDao farmDao;

    @Autowired
    private FarmUserService userService;

    public Long generateFarmId() {
        Long value = farmDao.getMaxFarmId();

        if (value == null)
            value = 10001L;
        else
            value = value + 1;

        return value;
    }

    public List<Farm> getAllFarmsByUser() {
        String username = userService.getUserId();
        return farmDao.getFarmsByUsername(username);
    }

    public List<Long> getAllFarmIdsByUser() {

        List<Farm> farmList = getAllFarmsByUser();
        List<Long> idList = new ArrayList<>();

        for (Farm farm : farmList) {
            idList.add(farm.getFarmId());
        }

        return idList;
    }
}