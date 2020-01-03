package durango.server.data;

import javax.persistence.Embeddable;

@Embeddable
public class KaficDetalji {
    private String opis;
    private String slike;
    private String radnoVreme;
    private String lokacija;
    private String meni;

    public KaficDetalji(){

    }

    public KaficDetalji(String opis, String slike, String radnoVreme, String lokacija, String meni){
        this.opis = opis;
        this.slike = slike;
        this.radnoVreme = radnoVreme;
        this.lokacija = lokacija;
        this.meni = meni;
    }

    public String getOpis() {
        return opis;
    }

    public String getSlike() {
        return slike;
    }

    public String getRadnoVreme() {
        return radnoVreme;
    }

    public String getLokacija() {
        return lokacija;
    }

    public String getMeni() {
        return meni;
    }

    public void setOpis(String opis) {
        this.opis = opis;
    }

    public void setSlike(String slike) {
        this.slike = slike;
    }

    public void setRadnoVreme(String radnoVreme) {
        this.radnoVreme = radnoVreme;
    }

    public void setLokacija(String lokacija) {
        this.lokacija = lokacija;
    }

    public void setMeni(String meni) {
        this.meni = meni;
    }
}
