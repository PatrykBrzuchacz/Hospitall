package pl.softsystem.hospital.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.softsystem.hospital.domain.model.Examination;
import pl.softsystem.hospital.domain.model.ExaminationType;

import java.util.List;

public interface ExaminationRepository extends JpaRepository<Examination, Long> {
    Examination getExaminationByType(ExaminationType type);

    Examination getExaminationById(Long id);

    void deleteAll();

    List<Examination> findAll();

    Examination save(Examination examination);
}
