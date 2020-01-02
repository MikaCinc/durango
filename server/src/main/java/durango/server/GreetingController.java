package durango.server;

import durango.server.data.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
public class GreetingController {
    @Autowired
    private KaficService kaficService;
    @Autowired
    private UserService userService;

    //Cafe connection handler
    @CrossOrigin(origins = "http://localhost:7000")
    @GetMapping("/lista-kafica")
    public ArrayList<Kafic> listaKafica(){
        return kaficService.getKafici();
    }

    @CrossOrigin(origins = "http://localhost:7000")
    @GetMapping("/lista-detalja")
    public ArrayList<KaficDetalji> listaDetalja(){
        return kaficService.getKaficiDetaljiList();
    }

    @CrossOrigin(origins = "http://localhost:7000")
    @GetMapping("/kafic/{id}")
    public Kafic getKafic(@PathVariable int id){
        return kaficService.getKafic(id);
    }

    @CrossOrigin(origins = "http://localhost:7000")
    @GetMapping("/kafic-detalji/{id}")
    public KaficDetalji getDetalje(@PathVariable int id){
        return kaficService.getKaficDetalji(id);
    }

    @CrossOrigin(origins = "http://localhost:7000")
    @PostMapping(value = "/kafic")
    public void kreirajKafic(@RequestBody Kafic kafic, KaficDetalji kaficDetalji){
        kaficService.kreirajKafic(kafic, kaficDetalji);
    }

    //User connection handler
    @CrossOrigin(origins = "http://localhost:7000")
    @GetMapping("/korisnik/{id}")
    public User getUserInfo(@PathVariable int id){
        return userService.getUser(id);
    }

    @PostMapping("/kreiraj-korisnika")
    @CrossOrigin(origins = "http://localhost:7000")
    public int kreirajKorisnika(@RequestBody User user){
        return userService.createUser(user);
    }
}
