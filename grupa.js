const grupa={template:`
<div>
    <button type="button"
    class="btn btn-primary m-2 fload-end"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    @click="addClick()">
    Dodaj Grupę
    </button>
<table class="table table-striped">
<thead>
    <tr>
        <th>
            Id
        </th>
        <th>
            Nazwa
        </th> 
        <th>
            Opcje
        </th>   
    </tr>
</thead>
<tbody>
    <tr v-for="grp in grups">
        <td>{{grp.id}}</td>
        <td>{{grp.nazwa}}</td>
        <td>
            <button type="button"
            class="btn btn-light mr-1"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            @click="editClick(grp)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                </svg>
            </button>
            <button type="button" @click="deleteClick(grp.id)"
            class="btn btn-light mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                </svg>
            </button>
        </td>
    </tr>
</tbody>
</table>
<div class="modal fade" id="exampleModal" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog modal-lg modal-dialog-centered">
<div class="modal-content">
    <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{{modalTitle}}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"
        aria-label="Zamknij"></button>
    </div>

    <div class="modal-body">
        <div class="input-group mb-3">
            <span class="input-group-text">Nazwa Grupy</span>
            <input type="text" class="form-control" v-model="nazwa">
        </div>

        <button type="button" @click="createClick()"
        v-if="id==0" class="btn btn-primary">
        Stwórz grupę
        </button>
        <button type="button" @click="updateClick()"
        v-if="id!=0" class="btn btn-primary">
        Edytuj grupę
        </button>
    </div>    
</div>
</div>
</div>

</div>
`,

data(){
    return{
        grups:[],
        modalTitle:"",
        id:0,
        nazwa:""
    }
},
methods:{
    refreshData(){
       axios.get(variables.API_URL+"grupa/")
       .then((res)=>{
            this.grups=res.data;   
       })
    },
    addClick(){
        this.modalTitle="Dodaj Grupę";
        this.id=0;
        this.nazwa="";
    },
    editClick(grp){
        this.modalTitle="Edytuj Grupę";
        this.id=grp.id;
        this.nazwa=grp.nazwa;
    },
    createClick(){
        axios.post(variables.API_URL+"grupa/",{
            nazwa:this.nazwa
        })
       .then((res)=>{
            this.refreshData();
            alert(res.data);
       });
    },
    updateClick(){
        axios.put(variables.API_URL+"grupa/",{
            id:this.id,
            nazwa:this.nazwa
        })
       .then((res)=>{
            this.refreshData();
            alert(res.data);
       });
    },
    deleteClick(id){
       if(!confirm("Jesteś pewien?")) {
        return;
       }
       axios.delete(variables.API_URL+"grupa/"+id)
       .then((res)=>{
            this.refreshData();
            alert(res.data);   
       });
    }
},
mounted:function(){
    this.refreshData();
}
}