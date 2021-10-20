package fiap.com.br.SofiaBag.security;

import fiap.com.br.SofiaBag.entity.User;
import fiap.com.br.SofiaBag.repository.UserRepository;
import fiap.com.br.SofiaBag.service.TokenService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class AuthorizationFilter extends OncePerRequestFilter {

    private TokenService tokenService;

    private UserRepository userRepository;

    public AuthorizationFilter(TokenService tokenService, UserRepository userRepository) {
        this.tokenService = tokenService;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = extractToken(request);

        boolean valid = tokenService.valid(token);

        if (valid) authorize(token);

        filterChain.doFilter(request, response);
    }

    private void authorize(String token) {
        String id = tokenService.getUserId(token);
        User user = userRepository.findUserById(id).get();

        UsernamePasswordAuthenticationToken auth =
                new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(auth);
    }

    private String extractToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");

        if (header == null || header.isEmpty() || !header.startsWith("Bearer "))
            return null;

        return header.substring(7, header.length());
    }
}
