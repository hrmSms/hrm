package vn.com.tma.hrm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.com.tma.hrm.entities.User;
import vn.com.tma.hrm.entities.VerificationToken;

public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long> {

    VerificationToken findByToken(String token);
    VerificationToken findByUser(User user);

}
