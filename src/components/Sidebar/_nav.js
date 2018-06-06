export default {
  items: [
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
      url: '/presensi',
      icon: 'icon-doc',
    },
  ]
};
