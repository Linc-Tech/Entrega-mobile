package fiap.com.br.SofiaBag.repository;

import fiap.com.br.SofiaBag.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findUserById(String id);
    Optional<User> findUserByEmail(String email);
}
