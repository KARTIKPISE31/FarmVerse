package edu.infosys.farmVerseApplication.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import edu.infosys.farmVerseApplication.bean.FarmUser;
import java.util.List;

public interface FarmUserRepository extends JpaRepository<FarmUser, String > {

 
}