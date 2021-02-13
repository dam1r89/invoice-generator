<template>
  <div class="no-print">
    <select name="" id="">
      <option v-for="client in clients" :value="client.id">{{ client.name }}</option>
    </select>
    <button @click="create">Create</button>
  </div>
  <div class="printable">
    <div class="text-left">
      {{ name }}
      <br>
      {{ company.name }}
      <br>
      {{ company.address }}
      <br>
      {{ company.address2 }}
      <br>
      MB: {{ company.mb }}
      <br>
      PIB: {{ company.pib }}
      <br>
      TR: {{ company.accountNumber }}
    </div>
    <div class="header">
      Račun
    </div>
    <div class="hbox">
      <div class="text-left">
        <table>
          <tr>
            <td>Račun broj</td>
            <td>{{ invoice.number }}</td>
          </tr>
          <tr>
            <td>Datum računa</td>
            <td>{{ invoice.date }}</td>
          </tr>
          <tr>
            <td>Datum plaćanja</td>
            <td>Decembar 16. 2020.</td>
          </tr>
        </table>
      </div>
      <div class="flex-auto text-right">
        {{ client.name }}
        <br>
        {{ client.address }}
        <br>
        {{ client.address2 }}
        <br>
        {{ client.mb }}
        <br>
        {{ client.pib }}
      </div>
    </div>
    <div class="main-table">
      <table class="text-left full-width table-main table-padding">
        <tr>
          <th> Naziv </th>
          <th> Opis </th>
          <th class="text-right"> Cena </th>
          <th class="text-right"> Količina </th>
          <th class="text-right"> Ukupno </th>
        </tr>
        <tr>
          <td> Naknada za pružanje usluga </td>
          <td> Račun za Decembar </td>
          <td class="text-right"> 20.000,00 </td>
          <td class="text-right"> 1 </td>
          <td class="text-right"> 20.000,00 </td>
        </tr>
        <tr>
          <td colspan="5"> &nbsp; </td>
        </tr>
      </table>
      <div class="text-left">
        <table class="table-sum table-padding" style="">
          <tr>
            <td> Ukupno </td>
            <td class="text-right"> 20.000,00 </td>
          </tr>
          <tr>
            <td> Plaćanje </td>
            <td class="text-right"> 0 </td>
          </tr>
          <tr class="strong-row">
            <td>
              Za uplatu (RSD)
            </td>
            <td class="text-right"> 20.000,00</td>
          </tr>
          <tr class="strong-row">
            <td> Rečima </td>
            <td>
              Dvadeset hiljada dinara
            </td class="text-right">
          </tr>
        </table>
      </div>
    </div>
    <div class="text-left text-small invoice-notes">
      Na osnovu člana 33 Zakona o PDV, ovaj račun je oslobo]en poreza na dodatu vrednost.
      <br>
      Ovaj račun je validan bez pečata i potpisa.
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase';

  const firebaseConfig = {
    apiKey: "AIzaSyB2QcCumkx7hQAp_aDjXsGYuXxejL7ZFsU",
    authDomain: "invoice-generator-e7852.firebaseapp.com",
    projectId: "invoice-generator-e7852",
    storageBucket: "invoice-generator-e7852.appspot.com",
    messagingSenderId: "514862196576",
    appId: "1:514862196576:web:f91110747984775423a005",
    measurementId: "G-7RG47JGJLL"
  };
  firebase.initializeApp(firebaseConfig);
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      clients: [],
      name: 'Damir Miladinov',
      company: {
        name: 'CORE PLAN BEOGRAD',
        address: 'Draže Pavlovića 2a',
        address2: '11120 Beograd',
        mb: '65989425',
        pib: '112266558',
        accountNumber: '265175031000157431'
      },
      client: {
        name: 'ART Nekretnine doo',
        address: 'Dositejeva 9',
        address2: '11000 Beograd',
        mb: '21053465',
        pib: '108716284'
      },
      invoice: {
        number: '00000001',
        date: 'Račun za Decembar'
      }
    }
  },
  mounted() {
    firebase.firestore().collection('clients').onSnapshot(({docs}) => {
      this.clients = docs.map(doc => ({id: doc.id, ...doc.data()}));
    });
  },
  methods: {
    create() {
      firebase.firestore().collection('clients').add({
        name: 'Test'
      });
    }
  }
}
</script>

<style>
  body {
    line-height: 1.3em;
    font-size: 14px;
  }
  table {
    border-collapse: collapse;
  }
  .table-padding td, .table-padding th{
    padding: 4px 10px;
  }
  .main-table {
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .header {
    font-size: 36px;
    margin: 40px 0;
  }
  .text-left {
    text-align: left;
  }
  .text-right {
    text-align: right;
  }
  .full-width {
    width: 100%;
  }
  .hbox {
      display: flex;
      flex-direction: row !important;
      position: relative;
  }
  .flex-auto {
      flex: auto;
  }
  .table-main {
    margin-top: 150px;
  }
  .table-main th,
  .table-main td{
    border-top: thin solid #999;
  }
  .table-main tr:last-child td{
    border-bottom: thin solid #999;
  }

  .table-sum {
    margin-left: auto
  }
  .strong-row {
    background: rgba(0,0,0,0.05);
    border-left: thin solid #999;
    border-right: thin solid #999;
  }
  .strong-row td{
    border-top: thin solid #999;
    border-bottom: thin solid #999;
  }
  .text-small {
    font-size: 0.8rem;
  }
  .invoice-notes {
    margin-top: 140px;
  }

  @media print {
    .no-print {
      display: none;
    }
  }
</style>
