package akadon.dao;

import java.util.List;

import akadon.entities.Notification;

public interface NotificationDAO {
	public List<Notification> getAllNotifications(Integer offset, Integer maxResult);
	public Notification getById(Integer id);
	public List<Notification> filterNotification(Integer offset, Integer maxResult, String query);
	public List<Notification> getReceivedNotificationsByEmail(String email, Integer offset, Integer maxResult);
	public Long countReceivedNotificationByEmail(String email);
	public Long countUnseenNotificationByEmail(String email);
	public Boolean viewNotification(Notification Notification);
	public Boolean viewAll(String email);
	public Boolean insertNotification(Notification Notification);
	public Boolean deleteNotification(Integer id);
}
