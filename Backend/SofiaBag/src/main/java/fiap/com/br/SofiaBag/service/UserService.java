package fiap.com.br.SofiaBag.service;

import fiap.com.br.SofiaBag.dto.request.PasswordDTO;
import fiap.com.br.SofiaBag.dto.request.UserDTO;
import fiap.com.br.SofiaBag.dto.response.MessageResponseDTO;
import fiap.com.br.SofiaBag.entity.User;
import fiap.com.br.SofiaBag.exception.UserNotFoundException;
import fiap.com.br.SofiaBag.mapper.UserMapper;
import fiap.com.br.SofiaBag.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor(onConstructor = @__( @Autowired ))
public class UserService {

    private UserRepository userRepository;

    private final UserMapper userMapper = UserMapper.INSTANCE;

    public MessageResponseDTO createUser(UserDTO userDTO) {
        User userToSave = userMapper.toModel(userDTO);

        userToSave.setPassword(
                AuthenticationService
                        .getPasswordEncoder()
                        .encode(userToSave.getPassword()));

        User savedUser = userRepository.save(userToSave);
        return createMessageResponse(savedUser, "create");
    }

    public Optional<UserDTO> getUser(String id) {
        Optional<User> userFound = userRepository.findUserById(id);
        if (userFound.isPresent()) {
            return userFound.map(userMapper::toDTO);
        }
        throw new UserNotFoundException();
    }

    public Optional<UserDTO> getUserByEmail(String email) {
        Optional<User> userFound = userRepository.findUserByEmail(email);
        if (userFound.isPresent()) {
            return userFound.map(userMapper::toDTO);
        }
        throw new UserNotFoundException();
    }

    public List<UserDTO> listAll() {
        List<User> allUsers = userRepository.findAll();
        return allUsers.stream()
                .map(userMapper::toDTO)
                .collect(Collectors.toList());
    }

    public MessageResponseDTO updateUserPassword(PasswordDTO passwordDTO) {
        User user = userRepository.findUserByEmail(passwordDTO.getEmail()).get();
        user.setPassword(
                AuthenticationService
                        .getPasswordEncoder()
                        .encode(passwordDTO.getPassword()));

        User updatedUser = userRepository.save(user);

        return createMessageResponse(updatedUser, "update");
    }

    private MessageResponseDTO createMessageResponse(User savedUser, String messageFor) {
        if (messageFor.startsWith("create")) {
            return MessageResponseDTO.builder()
                    .message("User " + savedUser.getName() + " created with ID " + savedUser.getId()).build();

        } else if (messageFor.startsWith("up")) {
            return MessageResponseDTO.builder()
                    .message("User " + savedUser.getName() + " updeted with ID " + savedUser.getId()).build();

        } else {
            return MessageResponseDTO.builder()
                    .message("User " + savedUser.getName() + " deleted with ID " + savedUser.getId()).build();
        }
    }
}
