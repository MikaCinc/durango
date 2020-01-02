package durango.server;

import durango.server.data.Kafic;
import durango.server.data.KaficDetalji;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class KaficService {

    private ArrayList<Kafic> kafici = new ArrayList<Kafic>();
    //private ArrayList<KaficDetalji> kaficDetalji = new ArrayList<KaficDetalji>();

    //@Autowired
    //KaficRepository kaficRepository; //= context.getBean(KaficRepository.class);


    public KaficService(){
        //kaficRepository.save(new Kafic(0, "SAAAAAAAAqare", "/sqare.png", 15, 7));
        //kaficRepository.save(new Kafic(1, "Y", "/sqare.png", 15, 7));
        //kaficRepository.save(new Kafic(2, "Cika Toma", "/sqare.png", 15, 7));
        //kaficRepository.save(new Kafic(3, "Lele", "/sqare.png", 15, 7));
        //kaficRepository.save(new Kafic(4, "Itd", "/sqare.png", 15, 7));

        kreirajKafic(0, "Vinyl", "vinyl.png", 15, 7, "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
                 new String[]{"slika1.png", "slika2.png","slika3.png"}, "00-24", "https://www.google.com/maps/place/Vinyl+Cafe/@43.3179874,21.8948292,15z/data=!4m5!3m4!1s0x0:0xa52fd515620420f!8m2!3d43.3179874!4d21.8948292?hl=sr", "meni");
        kreirajKafic(1, "Sqare", "/sqare.png", 15, 7, "Blablabla", new String[]{"lalalal slika 1", "laalala 2","lslslslsls 3"}, "00-24", "lok", "meni");
        kreirajKafic(2, "Sqare", "/sqare.png", 15, 7, "Blablabla", new String[]{"lalalal slika 1", "laalala 2","lslslslsls 3"}, "00-24", "lok", "meni");
        kreirajKafic(3, "Sqare", "/sqare.png", 15, 7, "Blablabla", new String[]{"lalalal slika 1", "laalala 2","lslslslsls 3"}, "00-24", "lok", "meni");
        kreirajKafic(4, "Sqare", "/sqare.png", 15, 7, "Blablabla", new String[]{"lalalal slika 1", "laalala 2","lslslslsls 3"}, "00-24", "lok", "meni");
        kreirajKafic(5, "Sqare", "/sqare.png", 15, 7, "Blablabla", new String[]{"lalalal slika 1", "laalala 2","lslslslsls 3"}, "00-24", "lok", "meni");
        }

    public ArrayList<Kafic> getKafici(){
        return kafici;
    }

    public Kafic getKafic(int id){
        //return kaficRepository.findById(id).get();

        for (int i = 0; i < kafici.size(); i++){
            if(kafici.get(i).getid() == id) return kafici.get(i);
        }
        return null;
    }

    public void kreirajKafic(Kafic kafic){
        kafici.add(kafic);
        //this.kaficDetalji.add(kaficDetalji);
    }


    public void kreirajKafic(int id, String title, String logo, int brojMesta, int brojSlobodnihMesta, String opis, String[] slike, String radnoVreme, String lokacija, String meni){
        kafici.add(new Kafic(id, title, logo, brojMesta, brojSlobodnihMesta,new KaficDetalji(opis, slike, radnoVreme, lokacija, meni)));
    }
}
