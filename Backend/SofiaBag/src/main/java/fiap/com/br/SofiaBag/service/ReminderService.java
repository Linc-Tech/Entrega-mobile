package fiap.com.br.SofiaBag.service;

import fiap.com.br.SofiaBag.dto.request.ReminderDTO;
import fiap.com.br.SofiaBag.dto.response.MessageResponseDTO;
import fiap.com.br.SofiaBag.entity.Reminder;
import fiap.com.br.SofiaBag.entity.User;
import fiap.com.br.SofiaBag.exception.ReminderAlreedyRegisteredException;
import fiap.com.br.SofiaBag.exception.ReminderNotFoundException;
import fiap.com.br.SofiaBag.mapper.ReminderMapper;
import fiap.com.br.SofiaBag.repository.ReminderRepository;
import fiap.com.br.SofiaBag.utils.ReminderValidation;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class ReminderService {

    private ReminderRepository reminderRepository;

    private final ReminderMapper reminderMapper = ReminderMapper.INSTANCE;

    public MessageResponseDTO createReminder(ReminderDTO reminderDTO) throws ReminderAlreedyRegisteredException, ParseException {
    	ReminderValidation.verifyIfIsAlreadyRegistered(reminderRepository, reminderDTO.getObject().getCdRfid(), reminderDTO.getReminderDate());
        Reminder reminderToSave = reminderMapper.toModel(reminderDTO);        
        
        reminderToSave = ReminderValidation.FormatObject(reminderToSave, reminderDTO);
        User user = reminderToSave.getObject().getUser();
        reminderToSave.setUser(user);

        Reminder savedReminder = reminderRepository.save(reminderToSave);
        return createMessageResponse(savedReminder, "create");
    }
    
	public MessageResponseDTO updateReminder(ReminderDTO reminderDTO) throws ReminderNotFoundException {
        ReminderValidation.verifyIfExists(reminderRepository, reminderDTO.getId());
		
		Reminder reminderToUpdate = reminderMapper.toModel(reminderDTO);
		
		reminderToUpdate = ReminderValidation.FormatObject(reminderToUpdate, reminderDTO);
		User user = reminderToUpdate.getObject().getUser();
		reminderToUpdate.setUser(user);
		
		Reminder updateReminder = reminderRepository.save(reminderToUpdate);		
		return createMessageResponse(updateReminder, "update");
	}

	public MessageResponseDTO deleteReminder(String cdReminder) throws ReminderNotFoundException {
		Reminder reminderToDelete = ReminderValidation.verifyIfExists(reminderRepository, cdReminder);
		
		reminderRepository.delete(reminderToDelete);
		
		return createMessageResponse(reminderToDelete, "delete");
	}
	
    public List<ReminderDTO> getUserObjectsFromADate(String email, String date) throws ParseException {
        Date objectDate = new SimpleDateFormat("yyyy-MM-dd").parse(date);
    	String dayWeek = new SimpleDateFormat("EEEE").format(objectDate);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yy");
        LocalDate localDate = LocalDate.parse(date);
        String dateFormatted = formatter.format(localDate);

		List<Reminder> reminderList = reminderRepository.findReminderDay(email, dayWeek, dateFormatted);
		
        return reminderList.stream()
                .map(reminderMapper::toDTO)
                .collect(Collectors.toList());
    }

    private MessageResponseDTO createMessageResponse(Reminder savedReminder, String messageFor) {
        if (messageFor.startsWith("create")) {
            return MessageResponseDTO.builder()
                    .message("Reminder " + savedReminder.getReminderDate() + " created with ID " + savedReminder.getId()).build();

        } else if (messageFor.startsWith("up")) {
            return MessageResponseDTO.builder()
                    .message("Reminder " + savedReminder.getReminderDate() + " updeted with ID " + savedReminder.getId()).build();

        } else {
            return MessageResponseDTO.builder()
                    .message("Reminder " + savedReminder.getReminderDate() + " deleted with ID " + savedReminder.getId()).build();
        }
    }

}
