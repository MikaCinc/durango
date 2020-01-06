package durango.server;

import durango.server.data.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
public class GreetingController {
    @Autowired
    private KaficService kaficService;
    @Autowired
    private UserService userService;

    //Cafe connection handler
    @GetMapping("/lista-kafica")
    public Iterable<Kafic> listaKafica(){
        return kaficService.getKafici();
    }

    @GetMapping("/kafic/{id}")
    public Kafic getKafic(@PathVariable int id){
        return kaficService.getKafic(id);
    }

    @PostMapping("/kafic")
    public void kreirajKafic(@RequestBody Kafic kafic){
        kaficService.kreirajKafic(kafic);
    }

    @DeleteMapping("/kafic")
    public int obrisiKafic(@RequestBody int id){
        return kaficService.obrisiKafic(id);
    }

    //User connection handler
    @GetMapping("/korisnik/{id}")
    public User getUserInfo(@PathVariable int id){
        return userService.getUser(id);
    }

    @PostMapping("/kreiraj-korisnika")
    public int kreirajKorisnika(@RequestBody User user){
        return userService.createUser(user);
    }

    @GetMapping("/lista-korisnika")
    public Iterable<User> getUsers(){
        return userService.getUsers();
    }

    @DeleteMapping("/korisnik")
    public Integer obrisiKorisnika(@RequestBody Integer id){
        return userService.obrisiKorisnika(id);
    }


    //FOR TESTING PURPOSES ONLY
    @GetMapping("/bla")
    public void bla(){
        userService.createUser(new User(0, "sdsds", "sdfgdg", "gjhjh", true));
        kaficService.kreirajKafic();
    }

}
