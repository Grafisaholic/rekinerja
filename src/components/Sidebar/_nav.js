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
      name: 'General',
      wrapper: {            // optional wrapper object
        element: "span",      // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ""             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'SKP',
      url: '/skp',
      icon: 'icon-calendar',
      children: [
        {
          name: 'List SKP',
          url: '/skp/list-skp',
          icon: 'icon-list'
        },
        {
          name: 'Target SKP',
          url: '/skp/target-skp',
          icon: 'icon-list'
        },
        {
          name: 'Capaian SKP',
          url: '/skp/capaian-skp',
          icon: 'icon-list'
        }
      ]
    },
    {
      name: 'Aktifitas',
      url: '/kegiatan',
      icon: 'icon-list',
    },
    {
      name: 'E-Presensi',
      url: '/presensi',
      icon: 'icon-doc',
    },
  ]
};
