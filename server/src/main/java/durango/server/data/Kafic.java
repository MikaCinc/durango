package durango.server.data;

//import javax.persistence.Entity;
//import javax.persistence.Id;

import org.hibernate.annotations.DynamicUpdate;
import org.springframework.boot.context.properties.bind.DefaultValue;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
public class Kafic {

    @Id
    private int id;
    private String title;
    private String logo;
    private int brojMesta;
    private int brojSlobodnihMesta;

    public Kafic(){
    }

    public Kafic(int id, String title, String logo, int brojMesta, int brojSlobodnihMesta){
        this.id = id;
        this.title = title;
        this.logo = logo;
        this.brojMesta = brojMesta;
        this.brojSlobodnihMesta = brojSlobodnihMesta;
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
}
