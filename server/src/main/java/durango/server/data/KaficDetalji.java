package durango.server.data;

public class KaficDetalji {
    private final String opis;
    private final String[] slike;
    private final String radnoVreme;
    private final String lokacija;
    private final String meni;

    public KaficDetalji(String opis, String[] slike, String radnoVreme, String lokacija, String meni){
        this.opis = opis;
        this.slike = slike;
        this.radnoVreme = radnoVreme;
        this.lokacija = lokacija;
        this.meni = meni;
    }

    public String getOpis() {
        return opis;
    }

    public String[] getSlike() {
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
}
