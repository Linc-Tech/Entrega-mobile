package fiap.com.br.SofiaBag.repository;

import fiap.com.br.SofiaBag.entity.Reminder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReminderRepository extends JpaRepository<Reminder, String> {
    @Query(value = "SELECT * FROM Lembrete l WHERE l.object_cd_rfid = :rfid AND l.dt_lembrete LIKE %:reminder%",  nativeQuery = true)
	Reminder findByCdRfidAndReminder(@Param("rfid")String rfid, @Param("reminder")CharSequence reminder);

	 @Query(value =  "SELECT * FROM LEMBRETE " +
					 "WHERE DT_LEMBRETE = TO_DATE(:reminder) AND USER_EMAIL_USUARIO = :userEmail " +
					 "OR REPEAT_TYPE = 1 " +
					 "OR (DAY_WEEK = :dayWeek AND REPEAT_TYPE <> 1 AND REPEAT_TYPE <> 0) ", nativeQuery = true)
	List<Reminder> findReminderDay(@Param("userEmail")String email, @Param("dayWeek")String dayWeek, @Param("reminder")CharSequence reminder);
}
