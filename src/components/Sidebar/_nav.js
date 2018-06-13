let menus = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'SASARAN KINERJA PEGAWAI',
    wrapper: {            // optional wrapper object
      element: "span",      // required valid HTML5 element tag
      attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
    },
    class: ""             // optional class names space delimited list for title item ex: "text-center"
  },
  {
    name: 'List SKP',
    url: '/skp/list-skp',
    icon: 'icon-list'
  },
  {
    name: 'Target',
    url: '/skp/target-skp',
    icon: 'fa fa-book'
  },
  {
    name: 'Capaian',
    url: '/skp/capaian-skp',
    icon: 'fa fa-calendar-check-o'
  },
  {
    name: 'Kegiatan',
    url: '/skp/kegiatan',
    icon: 'fa fa-history',
  },
  {
    title: true,
    name: 'Presensi',
    wrapper: {            // optional wrapper object
      element: "span",      // required valid HTML5 element tag
      attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
    },
    class: ""             // optional class names space delimited list for title item ex: "text-center"
  },
  {
    name: 'E-Presensi',
    url: '/epresensi',
    icon: 'icon-doc',
  },
]

const isAtasan = () => {
	let menuAtasan = [{
		title: true,
		name: 'REVIEW PEGAWAI',
		wrapper: {
		  element: "span",
		  attributes: {}
		},
		class: ""
	  },
	  {
		name: 'Review SKP',
		url: '/review/skp',
		icon: 'fa fa-list',
	  },
	  {
		name: 'Review Target',
		url: '/review/target',
		icon: 'fa fa-book',
	  },
	  {
		name: 'Review Capaian',
		url: '/review/capaian',
		icon: 'fa fa-calendar-check-o',
	  },
	  {
		name: 'Review Kegiatan',
		url: '/review/kegiatan',
		icon: 'fa fa-history',
	  }
	]

	menuAtasan.forEach((m, k) => {
		menus.push(m)
	})
}

isAtasan()

export default {
  items: menus
};