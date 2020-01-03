package durango.server.data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Kafic {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int id;
    private String title;
    private String logo;
    private int brojMesta;
    private int brojSlobodnihMesta;
    private KaficDetalji details;

    public Kafic(){

    }

    public Kafic(int id, String title, String logo, int brojMesta, int brojSlobodnihMesta, KaficDetalji details){
        this.id = id;
        this.title = title;
        this.logo = logo;
        this.brojMesta = brojMesta;
        this.brojSlobodnihMesta = brojSlobodnihMesta;
        this.details = details;
    }

    public int getid() {
        return id;
    }

    public String gettitle() {
        return title;
    }

    public String getlogo() {
        return logo;
    }

    public int getBrojMesta() {
        return brojMesta;
    }

    public int getbrojSlobodnihMesta() {
        return brojSlobodnihMesta;
    }

    public KaficDetalji getDetails(){
        return details;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public void setBrojMesta(int brojMesta) {
        this.brojMesta = brojMesta;
    }

    public void setBrojSlobodnihMesta(int brojSlobodnihMesta) {
        this.brojSlobodnihMesta = brojSlobodnihMesta;
    }

    public void setDetails(KaficDetalji details){
        this.details = details;
    }
}
