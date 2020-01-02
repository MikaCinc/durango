package durango.server.data;

import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserService {

    private ArrayList<User> users = new ArrayList<User>();

    private int currentID;

    public UserService() {
        currentID = 0;
        createUser(new User(0, "Luka", "blblb@gmail.com", "loca", true));
        createUser(new User(0, "Luka", "blblb@gmail.com", "loca", true));
        createUser(new User(0, "Luka", "blblb@gmail.com", "loca", true));
    }

    public ArrayList<User> getUsers(){
        return users;
    }

    public User getUser(int id){
        for (int i = 0; i < users.size(); i++){
            if(users.get(i).getId() == id) return users.get(i);
        }
        return null;
    }

    public int createUser(User user){
        user.setId(currentID);
        currentID++;
        users.add(user);
        return currentID-1;
    }
}
