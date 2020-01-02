package durango.server.data;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class KaficService {

    private ArrayList<Kafic> kafici = new ArrayList<Kafic>();
    private ArrayList<KaficDetalji> kaficDetalji = new ArrayList<KaficDetalji>();

    @Autowired
    KaficRepository kaficRepository; //= context.getBean(KaficRepository.class);


    public KaficService(){
        kaficRepository.save(new Kafic(0, "SAAAAAAAAqare", "/sqare.png", 15, 7));
        kaficRepository.save(new Kafic(1, "Y", "/sqare.png", 15, 7));
        //kaficRepository.save(new Kafic(2, "Cika Toma", "/sqare.png", 15, 7));
        //kaficRepository.save(new Kafic(3, "Lele", "/sqare.png", 15, 7));
        //kaficRepository.save(new Kafic(4, "Itd", "/sqare.png", 15, 7));

        //kreirajKafic(0, "Sqare", "/sqare.png", 15, 7, "Blablabla", new String[]{"lalalal slika 1", "laalala 2","lslslslsls 3"}, "00-24", "lok", "meni");
        //kreirajKafic(1, "Sqare", "/sqare.png", 15, 7, "Blablabla", new String[]{"lalalal slika 1", "laalala 2","lslslslsls 3"}, "00-24", "lok", "meni");
        //kreirajKafic(2, "Sqare", "/sqare.png", 15, 7, "Blablabla", new String[]{"lalalal slika 1", "laalala 2","lslslslsls 3"}, "00-24", "lok", "meni");
        //kreirajKafic(3, "Sqare", "/sqare.png", 15, 7, "Blablabla", new String[]{"lalalal slika 1", "laalala 2","lslslslsls 3"}, "00-24", "lok", "meni");
        //kreirajKafic(4, "Sqare", "/sqare.png", 15, 7, "Blablabla", new String[]{"lalalal slika 1", "laalala 2","lslslslsls 3"}, "00-24", "lok", "meni");
        //kreirajKafic(4, "Sqare", "/sqare.png", 15, 7, "Blablabla", new String[]{"lalalal slika 1", "laalala 2","lslslslsls 3"}, "00-24", "lok", "meni");
        }

    public ArrayList<Kafic> getKafici(){
        return kafici;
    }

    public ArrayList<KaficDetalji> getKaficiDetaljiList(){
        return kaficDetalji;
    }

    public Kafic getKafic(int id){

        return kaficRepository.findById(id).get();

        //for (int i = 0; i < kafici.size(); i++){
        //    if(kafici.get(i).getid() == id) return kafici.get(i);
        //}
       // return null;
    }

    public KaficDetalji getKaficDetalji(int id){
        for (int i = 0; i < kaficDetalji.size(); i++){
            if(kaficDetalji.get(i).getId() == id) return kaficDetalji.get(i);
        }
        return null;
    }

    public void kreirajKafic(Kafic kafic, KaficDetalji kaficDetalji){
        kafici.add(kafic);
        this.kaficDetalji.add(kaficDetalji);
    }


    public void kreirajKafic(int id, String title, String logo, int brojMesta, int brojSlobodnihMesta, String opis, String[] slike, String radnoVreme, String lokacija, String meni){
        kafici.add(new Kafic(id, title, logo, brojMesta, brojSlobodnihMesta));
        kaficDetalji.add(new KaficDetalji(id, opis, slike, radnoVreme, lokacija, meni));

    }
}
