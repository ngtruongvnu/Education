package akadon;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class EncrytedPasswordUtils {

	public static String encrytePassword(String password) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
//        String encodePassword = encoder.encode(password);
//        System.out.println("Password is   " + password);
//        System.out.println("Encode password is :   " + encodePassword);
        return encoder.encode(password);
    }
}
