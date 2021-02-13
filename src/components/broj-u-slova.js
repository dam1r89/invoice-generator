const map = {
  '1': 'jedan',
  '2': 'dva',
  '3': 'tri',
  '4': 'četiri',
  '5': 'pet',
  '6': 'šest',
  '7': 'sedam',
  '8': 'osam',
  '9': 'devet',
  '10': 'deset',
  '11': 'jedanaest',
  '12': 'dvanaest',
  '13': 'trinaest',
  '14': 'četrnaest',
  '15': 'petnaest',
  '16': 'šesnaest',
  '17': 'sedamnaest',
  '18': 'osamnaest',
  '19': 'devetnest',
}

export default function brojUSlova(broj) {
	broj = String(broj).padStart(15, 0);

	const hiljade = parseInt(broj.substr(-6, 3));
	let hiljadeString = null;
	if (hiljade === 1) {
	  hiljadeString = 'hiljadu';
	} else if (hiljade === 2) {
	  hiljadeString = 'dve hiljade';
	} else {
		const jedinice = parseInt(String(hiljade).substr(-1));

	  hiljadeString = getStotineBroj(hiljade) + ( [2, 3].includes(jedinice) ? ' hiljade' : ' hiljada');
	}


	return hiljadeString + ' ' + getStotineBroj(broj);

}

function getStotineBroj(broj) {
   broj = String(broj).padStart(15, 0);
  const mali = parseInt(broj.substr(-2));
  let maliString = null;
  if (mali === 0) {
    maliString = '';
  } else if (mali > 19) {
    const jedinice = parseInt(broj.substr(-1));
    maliString = map[String(mali)[0]]+'deset' + ((jedinice > 0) ? ' ' + map[String(mali)[1]] : '');
  } else {
    maliString = map[mali];
  }

  let stotineString = null;
  const stotine = parseInt(broj.substr(-3, 1));
    if (stotine === 0) {
      stotineString = '';
  } else if (stotine === 1) {
    stotineString = 'sto';
  } else if (stotine === 2) {

    stotineString = 'dvesta';
  } else {

    stotineString = map[stotine] + ( [2,3].includes(stotine) ? 'sta': 'sto');
  }
  return stotineString + ' ' + maliString;
}
