package fiap.com.br.SofiaBag.service;

import fiap.com.br.SofiaBag.entity.User;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class TokenService {

    @Value("${sofia.bag.jwt.duration}")
    private long duration;

    @Value("${sofia.bag.jwt.secret}")
    private String secret;

    public String createToken(Authentication authentication) {
        User user = (User) authentication.getPrincipal();

        Date today = new Date();
        Date expirationDate = new Date(today.getTime() + duration);

        System.out.println(today);
        System.out.println("Expiration: " + expirationDate);

        String token = Jwts.builder()
                            .setIssuer("Sofia Bag API")
                            .setSubject(user.getId())
                            .setIssuedAt(today)
                            .setExpiration(expirationDate)
                            .signWith(SignatureAlgorithm.HS256, secret)
                            .compact();

        return token;
    }

    public boolean valid(String token) {
        try {
            Jwts.parser().setSigningKey(secret).parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException | UnsupportedJwtException | MalformedJwtException | SignatureException
                | IllegalArgumentException e) {
            return false;
        }
    }

    public String getUserId(String token) {
        Claims claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
        return claims.getSubject();
    }
}
