package fiap.com.br.SofiaBag.controller;

import fiap.com.br.SofiaBag.dto.request.PasswordDTO;
import fiap.com.br.SofiaBag.dto.request.UserDTO;
import fiap.com.br.SofiaBag.dto.response.MessageResponseDTO;
import fiap.com.br.SofiaBag.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/v1/user")
@AllArgsConstructor(onConstructor = @__( @Autowired ))
public class UserController {

    private UserService userService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MessageResponseDTO createUser(@RequestBody UserDTO userDTO) {
        return userService.createUser(userDTO);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<UserDTO> listUsers() {
        return userService.listAll();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Optional<UserDTO> getUser(@PathVariable String id) {
        return userService.getUser(id);
    }

    @GetMapping("/email/{email}")
    @ResponseStatus(HttpStatus.OK)
    public Optional<UserDTO> getUserByEmail(@PathVariable String email) {
        return userService.getUserByEmail(email);
    }

    @PostMapping("/password")
    @ResponseStatus(HttpStatus.OK)
    public MessageResponseDTO updateUserPassword(@RequestBody PasswordDTO passwordDTO) {
        return userService.updateUserPassword(passwordDTO);
    }

}
