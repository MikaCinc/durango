package durango.server.data;

public class User {

    private Integer id;
    private String name;
    private String email;
    private String location;
    private boolean canReserve;

    public User(int id, String name, String email, String location, boolean canReserve){
        this.id = id;
        this.name = name;
        this.email = email;
        this.location = location;
        this.canReserve = canReserve;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public boolean isCanReserve() {
        return canReserve;
    }

    public void setCanReserve(boolean canReserve) {
        this.canReserve = canReserve;
    }
}
