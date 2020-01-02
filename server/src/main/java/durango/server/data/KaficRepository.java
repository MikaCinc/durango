package durango.server.data;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface KaficRepository extends CrudRepository<Kafic, Integer> {
}
