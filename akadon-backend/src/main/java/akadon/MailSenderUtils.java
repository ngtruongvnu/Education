package akadon;

import java.io.UnsupportedEncodingException;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Repository;

public class MailSenderUtils {
	
	static JavaMailSender mailSender;
	
	public static void sendVerificationCodeMail(String name, String code, String email) {
		String subject = "Vui lòng xác nhận tài khoản";
		String senderName = "Akadon Education";
		String mailContent = "<p style='font-size:24px;font-style:italic'; font-weight:500'>Xin chào <b>" + name+"</p>";
		mailContent += "<p style='font-size:24px'>Mã xác nhận email của bạn là </p>";
		mailContent += "<p style='font-size:30px';color: #2ED8B6;font-weight:500'><b>"+code+"</p>";
		mailContent += "<p style='font-size:24px;font-weight:500'>Xin cảm ơn !<br> Akadon Education</p>";
		MimeMessage messege = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(messege);
		try {
			helper.setFrom("th0979175333@gmail.com",senderName);
			helper.setTo(email);
			helper.setSubject(subject);
			helper.setText(mailContent,true);
			mailSender.send(messege);
		} catch (UnsupportedEncodingException | MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public static void sendUserQuestion(String name, String content, String email) {
		String subject = "Thắc mắc của người dùng";
		String senderName = name;
		String mailContent = "<p style='font-size:24px;font-style:italic'; font-weight:500'>Câu hỏi của: <b>" + name+"</p>";
		mailContent += "<p style='font-size:30px';color: #2ED8B6;font-weight:500'><b>"+content+"</p>";
		MimeMessage messege = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(messege);
		try {
			helper.setFrom(email,senderName);
			helper.setTo("th0979175333@gmail.com");
			helper.setSubject(subject);
			helper.setText(mailContent,true);
			mailSender.send(messege);
		} catch (UnsupportedEncodingException | MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
