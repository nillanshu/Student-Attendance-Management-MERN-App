export let adminConstant=[
    {
      title: 'Announcements',
      items: [
        {
          icon: 'fas fa-chalkboard',
          manageText: 'Manage Announcements',
          links: [
            { href: 'viewAnnouncements.php', text: 'View Announcements' },
            { href: 'createAnnouncement.php', text: 'Create Announcement' },
          ]
        },
      ]
    },
    {
      title: 'Class and Class Arms',
      items: [
        {
          icon: 'fas fa-chalkboard',
          manageText: 'Manage Classes',
          links: [
            { href: 'createClass.php', text: 'Create Class' },
          ]
        },
        {
          icon: 'fas fa-code-branch',
          manageText: 'Manage Class Arms',
          links: [
            { href: 'createClassArms.php', text: 'Create Class Arms' },
          ]
        },
      ]
    },
    {
      title: 'Teachers',
      items: [
        {
          icon: 'fas fa-chalkboard',
          manageText: 'Manage Class Teachers',
          links: [
            { href: 'createAnnouncement.php', text: 'Create Class Teacher' },
          ]
        },
      ]
    },
    {
      title: 'Students',
      items: [
        {
          icon: 'fas fa-chalkboard',
          manageText: 'Manage Students',
          links: [
            { href: 'createAnnouncement.php', text: 'Create Student' },
          ]
        },
      ]
    },
    {
      title: 'Sessiion & Term',
      items: [
        {
          icon: 'fas fa-chalkboard',
          manageText: 'Manage Sessiion & Term',
          links: [
            { href: 'createAnnouncement.php', text: 'Create Sessiion & Term' },
          ]
        },
      ]
    },
    // Other sections
  ]

export let teacherConstant=[
  {
    title: 'Students',
    items: [
      {
        icon: 'fas fa-chalkboard',
        manageText: 'Manage Students',
        links: [
          { href: 'viewStudennt.php', text: 'View Students' },
        ]
      },
    ]
  },
  {
    title: 'Attendance',
    items: [
      {
        icon: 'fas fa-chalkboard',
        manageText: 'Manage Attendance',
        links: [
          { href: 'takeAttendance.php', text: 'Take Attendance' },
          { href: 'viewAttendance.php', text: 'View Class Attendance' },
          { href: 'viewStudentAttendance.php', text: 'View Student Attendance' },
          { href: 'downloadRecord.php', text: "Today's Report (xls)" },
        ]
      },
    ]
  },
  {
    title: 'Requests',
    items: [
      {
        icon: 'fas fa-chalkboard',
        manageText: 'Manage Requests',
        links: [
          { href: 'createStudennt.php', text: 'Attendance Requests' },
          { href: 'createStudennt.php', text: 'Doc Update Requests' },
        ]
      },
    ]
  },
]

export let studentConstant=[
  {
    title: 'Work',
    items: [
      {
        icon: 'fas fa-chalkboard',
        manageText: 'Manage Assignments',
        links: [
          { href: 'createAssignment.php', text: 'Create Assignment' },
        ]
      },
      {
        icon: 'fas fa-chalkboard',
        manageText: 'Manage Notes',
        links: [
          { href: 'createNotes.php', text: 'Create Notes' },
        ]
      },
    ]
  },
  {
    title: 'Attendance',
    items: [
      {
        icon: 'fas fa-chalkboard',
        manageText: 'Check Attendance',
        links: [
          { href: 'viewAttendance.php', text: 'View Attendance' },
          { href: 'requestAttendance.php', text: 'Request Attendance' },
        ]
      },
    ]
  },
  {
    title: 'Requests',
    items: [
      {
        icon: 'fas fa-chalkboard',
        manageText: 'Create Requests',
        links: [
          { href: 'requestAttendance.php', text: 'Request Attendance' },
          { href: 'requestDocUpdate.php', text: 'Request Doc Update' },
        ]
      },
    ]
  },
]