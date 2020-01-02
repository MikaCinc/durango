package durango.server;

import durango.server.data.Kafic;
import durango.server.data.KaficDetalji;
import durango.server.data.KaficService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
public class ConnectionController {

    @Autowired
    private KaficService kaficService;

    @GetMapping("/lista-kafica")
    public ArrayList<Kafic> listaKafica(){
        return kaficService.getKafici();
    }

    @GetMapping("/lista-detalja")
    public ArrayList<KaficDetalji> listaDetalja(){
        return kaficService.getKaficiDetaljiList();
    }

    @GetMapping("/kafic/{id}")
    public Kafic getKafic(@PathVariable int id){
        return kaficService.getKafic(id);
    }

    @GetMapping("/kafic-detalji/{id}")
    public KaficDetalji getDetalje(@PathVariable int id){
        return kaficService.getKaficDetalji(id);
    }

    @PostMapping(value = "/kafic")
    public void kreirajKafic(@RequestBody Kafic kafic, KaficDetalji kaficDetalji){
        kaficService.kreirajKafic(kafic, kaficDetalji);
    }
}
