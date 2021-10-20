package fiap.com.br.SofiaBag.mapper;

import fiap.com.br.SofiaBag.dto.request.UserDTO;
import fiap.com.br.SofiaBag.dto.response.UserResponseDTO;
import fiap.com.br.SofiaBag.entity.User;
import fiap.com.br.SofiaBag.model.LoginModel;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.Optional;

@Mapper
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    User toModel(UserDTO userDTO);

    UserDTO toDTO(User user);

    UserDTO toDTO(Optional<User> userOptional);

    UserResponseDTO toReponseDTO(User user);
}
