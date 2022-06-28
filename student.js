const student={template:`
<div>
<button type="button"
class="btn btn-primary m-2 fload-end"
data-bs-toggle="modal"
data-bs-target="#exampleModal"
@click="addClick()">
Dodaj Studenta
</button>
<table class="table table-striped">
<thead>
    <tr>
        <th>
            Id
        </th>
        <th>
            Imie
        </th>
        <th>
            Nazwisko
        </th> 
        <th>
            Indeks
        </th>
        <th>
            Grupa
        </th> 
        <th>
            Opcje
        </th>    
    </tr>
</thead>
<tbody>
<tr v-for="std in students">
    <td>{{std.id}}</td>
    <td>{{std.Imie}}</td>
    <td>{{std.Nazwisko}}</td>
    <td>{{std.indeks}}</td>
    <td>{{std.Grupa}}</td>
    <td>
        <button type="button"
        class="btn btn-light mr-1"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        @click="editClick(std)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
            </svg>
        </button>
        <button type="button" @click="deleteClick(std.id)"
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
<div class="d-flex flex-row bd-highlight mb-3">
    <div class="p-2 w-50 bd-highlight">
        <div class="input-group mb-3">
            <span class="input-group-text">Imie</span>
            <input type="text" class="form-control" v-model="Imie">
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text">Nazwisko</span>
            <input type="text" class="form-control" v-model="Nazwisko">
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text">indeks</span>
            <input type="int" class="form-control" v-model="indeks">
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text">Grupa</span>
            <select class="form-select" v-model="Grupa">
                <option v-for="grp in grups">
                {{grp.nazwa}}
                </option>
            </select>
        </div>
    </div>
    <div class="p-2 w-50 bd-highlight">
            <img width="250px" height="250px"
                :src="PhotoPath+Zdjecie"/>
            <input class="m-2" type="file" @change="imageUpload">
    </div>
</div>
    <button type="button" @click="createClick()"
    v-if="id==0" class="btn btn-primary">
    Dodaj Studenta
    </button>
    <button type="button" @click="updateClick()"
    v-if="id!=0" class="btn btn-primary">
    Edytuj
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
    students:[],
    modalTitle:"",
    id:0,
    Imie:"",
    Nazwisko:"",
    indeks:0,
    Grupa:"",
    Zdjecie:"default.jpg",
    PhotoPath:variables.PHOTO_URL  
}
},
methods:{
refreshData(){
   axios.get(variables.API_URL+"student/")
   .then((res)=>{
        this.students=res.data;   
   })
   axios.get(variables.API_URL+"grupa/")
   .then((res)=>{
        this.grups=res.data;   
   })
},
addClick(){
    this.modalTitle="Dodaj Studenta",
    this.id=0,
    this.Imie="",
    this.Nazwisko="",
    this.indeks=0,
    this.Grupa="",
    this.Zdjecie="default.jpg"
},
editClick(std){
    this.modalTitle="Edytuj";
    this.id=std.id,
    this.Imie=std.Imie,
    this.Nazwisko=std.Nazwisko,
    this.indeks=std.indeks,
    this.Grupa=std.Grupa,
    this.Zdjecie=std.Zdjecie
},
createClick(){
    axios.post(variables.API_URL+"student/",{
        Imie:this.Imie,
        Nazwisko:this.Nazwisko,
        indeks:this.indeks,
        Grupa:this.Grupa,
        Zdjecie:this.Zdjecie
    })
   .then((res)=>{
        this.refreshData();
        alert(res.data);
   });
},
updateClick(){
    axios.put(variables.API_URL+"student/",{
        id:this.id,
        Imie:this.Imie,
        Nazwisko:this.Nazwisko,
        indeks:this.indeks,
        Grupa:this.Grupa,
        Zdjecie:this.Zdjecie
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
   axios.delete(variables.API_URL+"student/"+id)
   .then((res)=>{
        this.refreshData();
        alert(res.data);   
   });
},
imageUpload(event){
    let formData=new FormData();
    formData.append('file',event.target.files[0]);
    axios.post(variables.API_URL+"student/ZapiszZdjecie/",
    formData)
    .then((res)=>{
        this.Zdjecie=res.data;
    });
}
},
mounted:function(){
this.refreshData();
}
}