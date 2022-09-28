package akadon.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import akadon.dao.NotificationDAO;
import akadon.entities.Notification;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value="/notification")

public class NotificationController {
	@Autowired
	NotificationDAO notificationDAO;
	
	@GetMapping(value="/get-all-Notifications")
	public List<Notification> getAllNotifications(@RequestParam("page")Integer page,@RequestParam("numberItems")Integer numberItems){
		if (page==null) {
			page = 1;
		} 
		int offset = (page-1)*numberItems;
		int maxResult = numberItems;
		List<Notification> list = notificationDAO.getAllNotifications(offset, maxResult);
		return list;
	}
	
		
	@GetMapping(value="/get-Notification")
	public Notification getById(@RequestParam("id")Integer id) {
		return notificationDAO.getById(id);
	}
	
	@GetMapping(value="/count-Notification")
	public Long countByEmail(@RequestParam("email")String email) {
		return notificationDAO.countReceivedNotificationByEmail(email);
	}
	
	@GetMapping(value="/count-unseen-Notification")
	public Long countUnseenByEmail(@RequestParam("email")String email) {
		return notificationDAO.countUnseenNotificationByEmail(email);
	}
	
	@GetMapping(value="/get-received-Notification")
	public List<Notification> getReceivedNotificationsByEmail(@RequestParam("email")String email, @RequestParam("page")Integer page,@RequestParam("numberItems")Integer numberItems) {
		if (page==null) {
			page = 1;
		} 
		int offset = (page-1)*numberItems;
		int maxResult = numberItems;
		return notificationDAO.getReceivedNotificationsByEmail(email, offset, maxResult);
	}
	
	@PostMapping(value="/insert-Notification")
	public Boolean insertNotification(@RequestBody Notification Notification) {
		return notificationDAO.insertNotification(Notification);
	}
	
	@PutMapping(value="/view-Notification")
	public Boolean viewNotification(@RequestBody Notification Notification) {
		return notificationDAO.viewNotification(Notification);
	}
	
	@GetMapping(value="/view-all")
	public Boolean viewAll(@RequestParam String email) {
		return notificationDAO.viewAll(email);
	}
	
	@DeleteMapping(value="/delete-Notification")
	public Boolean deleteNotification(@RequestParam("id") Integer id) {
		return notificationDAO.deleteNotification(id);
	}
	
}
