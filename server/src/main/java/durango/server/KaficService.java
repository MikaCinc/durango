package durango.server;

import durango.server.data.Kafic;
import durango.server.data.KaficDetalji;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class KaficService {

    @Autowired
    private KaficRepository kaficRepository;


    public KaficService(){

    }

    public Iterable<Kafic> getKafici(){
        return kaficRepository.findAll();
    }

    public Kafic getKafic(int id){
        return kaficRepository.findById(id).get();
    }

    public void kreirajKafic(Kafic kafic){
        kaficRepository.save(kafic);
    }


    public void kreirajKafic(){
        kaficRepository.save(new Kafic(0, "Sqare", "/sqare.png", 15, 7, new KaficDetalji("Blablabla", "lalalal slika 1", "00-24", "lok", "meni")));
    }
}
