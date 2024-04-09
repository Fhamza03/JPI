package com.JESA.JPI.Repository;

import com.JESA.JPI.Model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<UserModel,Integer> {
    Optional<UserModel> findByUsername(String Username);
}
