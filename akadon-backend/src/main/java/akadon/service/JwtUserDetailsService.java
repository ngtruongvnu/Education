package akadon.service;

import java.util.ArrayList;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import akadon.entities.Student;
import akadon.entities.Tutor;

@Service
public class JwtUserDetailsService implements UserDetailsService {

	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Session session = sessionFactory.openSession();
		try {
			Student student = (Student) session.createQuery("From Student where email=:username or phonenumber=:username")
					.setParameter("username", username)
					.uniqueResult();
			Tutor tutor = (Tutor) session.createQuery("From Tutor where email=:username or phonenumber=:username")
					.setParameter("username", username)
					.uniqueResult();
			if (student != null ) {
				return new User(student.getEmail(), student.getPassword().trim(),new ArrayList<>());
			}
			if (tutor != null ) {
				return new User(tutor.getEmail(), tutor.getPassword(),new ArrayList<>());
			}
			if (student == null && tutor == null) {
				throw new UsernameNotFoundException("User not found with username: " + username);
			}
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		} finally {
			session.close();
		}
		return null;
	}
}