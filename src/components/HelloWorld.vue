<template>
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
    <table class="text-left full-width">
      <tr>
        <th> Naziv </th>
        <th> Opis </th>
        <th> Cena </th>
        <th> Količina </th>
        <th> Ukupno </th>
      </tr>
      <tr>
        <td> Naknada za pružanje usluga </td>
        <td> Račun za Decembar </td>
        <td> 20.000,00 </td>
        <td> 1 </td>
        <td> 20.000,00 </td>
      </tr>
      <tr>
        <td colspan="5"> &nbsp; </td>
      </tr>
    </table>
    <table>
      <tr>
        <td> Ukupno </td>
        <td> 20.000,00 </td>
      </tr>
      <tr>
        <td> Plaćanje </td>
        <td> 0 </td>
      </tr>
      <tr>
        <td>
          Za uplatu (RSD)
        </td>
        <td> 20.000,00</td>
      </tr>
      <tr>
        <td> Rečima </td>
        <td>
          Dvadeset hiljada dinara
        </td>
      </tr>
    </table>
  </div>
  <div>
    Na osnovu člana 33 Zakona o PDV, ovaj račun je oslobo]en poreza na dodatu vrednost.
    <br>
    Ovaj račun je validan bez pečata i potpisa.
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
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
  }
}
</script>

<style>
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
</style>
