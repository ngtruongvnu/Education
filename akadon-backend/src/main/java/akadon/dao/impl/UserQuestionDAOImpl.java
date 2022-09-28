package akadon.dao.impl;

import java.io.UnsupportedEncodingException;
import java.util.List;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Repository;

import akadon.MailSenderUtils;
import akadon.dao.UserQuestionDAO;
import akadon.entities.UserQuestion;

@Repository
public class UserQuestionDAOImpl implements UserQuestionDAO {

	@Autowired
	SessionFactory sessionFactory;
	
	@Autowired
	JavaMailSender mailSender;
	
	@Override
	public List<UserQuestion> getAllUserQuestions(Integer offset, Integer maxResult) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			List list = session.createQuery("From UserQuestion Order by askDate DESC").setFirstResult(offset).setMaxResults(maxResult).list();
			session.getTransaction().commit();
			return list;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		} finally {
			session.close();
		}

		return null;
	}

	@Override
	public List<UserQuestion> getByEmail(String email, Integer offset, Integer maxResult) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			List<UserQuestion> list = session.createQuery("From UserQuestion where email =:email")
					.setParameter("email", email)
					.setFirstResult(offset)
					.setMaxResults(maxResult)
					.list();
			session.getTransaction().commit();
			return list;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		} finally {
			session.close();
		}
		return null;
	}

	@Override
	public Boolean insertUserQuestion(UserQuestion userQuestion) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			session.save(userQuestion);
			String subject = "Thắc mắc của người dùng";
			String senderName = userQuestion.getFullName();
			String mailContent = "<p style='font-size:24px;font-style:italic'; font-weight:500'>Câu hỏi của: <b>" + userQuestion.getFullName()+"</p>";
			mailContent += "<p style='font-size:30px';color: #2ED8B6;font-weight:500'><b>"+userQuestion.getContent()+"</p>";
			MimeMessage messege = mailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(messege);
			try {
				helper.setFrom(userQuestion.getSendEmail(),senderName);
				helper.setTo("th0979175333@gmail.com");
				helper.setSubject(subject);
				helper.setText(mailContent,true);
				mailSender.send(messege);
			} catch (UnsupportedEncodingException | MessagingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			session.getTransaction().commit();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
			return false;
		}
	}

	@Override
	public Boolean deleteUserQuestion(Integer id) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			session.delete(session.get(UserQuestion.class,id));
			session.getTransaction().commit();
			return true;
		} catch (Exception e) {
			session.getTransaction().rollback();
			e.printStackTrace();
			return false;
		}
	}

}
