package akadon.dao.impl;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import akadon.dao.ReviewDAO;
import akadon.entities.Review;

@Repository
public class ReviewDAOImpl implements ReviewDAO {

	@Autowired
	SessionFactory sessionFactory;

	@Override
	public List<Review> getAllReviews(Integer offset, Integer maxResult) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			List list = session.createQuery("From Review").setFirstResult(offset).setMaxResults(maxResult).list();
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
	public List<Review> filterReview(Integer offset, Integer maxResult, String query) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			List list = session.createQuery("From Review where " + query).setFirstResult(offset)
					.setMaxResults(maxResult).list();
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
	public Review getById(Integer id) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			Review Review = session.get(Review.class, id);
			session.getTransaction().commit();
			return Review;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		} finally {
			session.close();
		}
		return null;
	}

	@Override
	public String insertReview(Review review) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		String result = "";
		try {
			Integer check = session.createQuery(
					"From Review where sendCommentEmail =:sendCommentEmail and receiveCommentEmail=:receiveCommentEmail")
					.setParameter("receiveCommentEmail", review.getReceiveCommentEmail())
					.setParameter("sendCommentEmail", review.getSendCommentEmail()).list().size();
			if (check > 0) {
				result += "Bạn đã đánh giá người này rồi !";
			}
			if (result.length() == 0) {
				session.save(review);
				session.getTransaction().commit();
				return "Thành công";
			} else {
				session.getTransaction().rollback();
				return result;
			}

		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		}
		return null;
	}

	@Override
	public List<Review> getReceivedReviewsByEmail(String email) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			List list = session
					.createQuery("From Review where receiveCommentEmail=:receiveCommentEmail Order By commentDate DESC")
					.setParameter("receiveCommentEmail", email).list();
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
	public List<Review> getSentReviewsByEmail(String email) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			List list = session
					.createQuery("From Review where sendCommentEmail=:sendCommentEmail Order By commentDate DESC")
					.setParameter("sendCommentEmail", email).list();
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
	public List<Review> getReviewsByEmailAndRate(String email, Integer rate) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			if (rate == 6) {
				List list = session
						.createQuery("From Review where receiveCommentEmail=:email Order By commentDate DESC")
						.setParameter("email", email).list();
				session.getTransaction().commit();
				return list;
			} else {
				List list = session.createQuery(
						"From Review where receiveCommentEmail=:email and rating=:rate Order By commentDate DESC")
						.setParameter("email", email).setParameter("rate", rate).list();
				session.getTransaction().commit();
				return list;
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		} finally {
			session.close();
		}
		return null;
	}

	@Override
	public Double getAverageRate(String email) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		try {
			Double average = (Double) session.createQuery("Select Avg(rating) From Review "
					+ " where receiveCommentEmail=:email")
					.setParameter("email", email)
					.uniqueResult();
			session.getTransaction().commit();
			return average;
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		} finally {
			session.close();
		}
		return null;
	}

}
