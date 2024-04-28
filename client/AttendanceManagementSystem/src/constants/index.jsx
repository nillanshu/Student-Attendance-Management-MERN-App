export let adminConstant = {
  sections: [
    // {
    //   title: 'Announcements',
    //   items: [
    //     {
    //       icon: 'fas fa-chalkboard',
    //       manageText: 'Manage Announcements',
    //       links: [
    //         { href: 'viewAnnouncements', text: 'View Announcements' },
    //         { href: 'createAnnouncement', text: 'Create Announcement' },
    //       ]
    //     },
    //   ]
    // },
    {
      title: 'Class and Class Arms',
      items: [
        {
          icon: 'fas fa-chalkboard',
          manageText: 'Manage Classes',
          links: [
            { href: '/Admin/createClass', text: 'Create Class' },
          ]
        },
        {
          icon: 'fas fa-code-branch',
          manageText: 'Manage Class Arms',
          links: [
            { href: '/Admin/createClassArm', text: 'Create Class Arms' },
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
            { href: '/Admin/createClassTeacher', text: 'Create Class Teacher' },
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
            { href: '/Admin/createStudent', text: 'Create Student' },          
          ]
        },
      ]
    },
    {
      title: 'Session & Term',
      items: [
        {
          icon: 'fas fa-chalkboard',
          manageText: 'Manage Session & Term',
          links: [
            { href: '/Admin/createSessionTerm', text: 'Create Session & Term' },
          ]
        },
      ]
    },
  ],
  link: {
    title: 'Dashboard',
    href: '/Admin/dashboard'
  }
}

export let teacherConstant = {
  sections: [
    {
      title: 'Students',
      items: [
        {
          icon: 'fas fa-chalkboard',
          manageText: 'Manage Students',
          links: [
            { href: '/classTeacher/viewStudents', text: 'View Students' },
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
            { href: '/classTeacher/takeAttendance', text: 'Take Attendance' },
            { href: '/classTeacher/viewClassAttendance', text: 'View Class Attendance' },
            { href: '/classTeacher/viewStudentAttendance', text: 'View Student Attendance' },
            // { href: 'downloadRecord', text: "Today's Report (xls)" },
          ]
        },
      ]
    },
    // {
    //   title: 'Requests',
    //   items: [
    //     {
    //       icon: 'fas fa-chalkboard',
    //       manageText: 'Manage Requests',
    //       links: [
    //         { href: 'createStudennt', text: 'Attendance Requests' },
    //         { href: 'createStudennt', text: 'Doc Update Requests' },
    //       ]
    //     },
    //   ]
    // },
  ],
  link: {
    title: 'Dashboard',
    href: '/classTeacher/dashboard'
  }
}

export let studentConstant = {
  sections: [
    // {
    //   title: 'Work',
    //   items: [
    //     {
    //       icon: 'fas fa-chalkboard',
    //       manageText: 'Manage Assignments',
    //       links: [
    //         { href: 'createAssignment', text: 'Create Assignment' },
    //       ]
    //     },
    //     {
    //       icon: 'fas fa-chalkboard',
    //       manageText: 'Manage Notes',
    //       links: [
    //         { href: 'createNotes', text: 'Create Notes' },
    //       ]
    //     },
    //   ]
    // },
    {
      title: 'Attendance',
      items: [
        {
          icon: 'fas fa-chalkboard',
          manageText: 'Check Attendance',
          links: [
            { href: '/Student/viewAttendance', text: 'View Attendance' },
          ]
        },
      ]
    },
    // {
    //   title: 'Requests',
    //   items: [
    //     {
    //       icon: 'fas fa-chalkboard',
    //       manageText: 'Create Requests',
    //       links: [
    //         { href: 'requestAttendance', text: 'Request Attendance' },
    //         { href: 'requestDocUpdate', text: 'Request Doc Update' },
    //       ]
    //     },
    //   ]
    // },
  ],
  link: {
    title: 'Dashboard',
    href: '/Student/dashboard'
  }
}

export let subjTeacherConstant = {
  sections: [
    {
      title: 'Students',
      items: [
        {
          icon: 'fas fa-chalkboard',
          manageText: 'Manage Students',
          links: [
            { href: '/SubjTeacher/viewStudents', text: 'View Students' },
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
            { href: '/SubjTeacher/takeAttendance', text: 'Take Attendance' },
            { href: '/SubjTeacher/viewClassAttendance', text: 'View Class Attendance' },
            { href: '/SubjTeacher/viewStudentAttendance', text: 'View Student Attendance' },
            // { href: 'downloadRecord', text: "Today's Report (xls)" },
          ]
        },
      ]
    },
    // {
    //   title: 'Requests',
    //   items: [
    //     {
    //       icon: 'fas fa-chalkboard',
    //       manageText: 'Manage Requests',
    //       links: [
    //         { href: 'createStudennt', text: 'Attendance Requests' },
    //         { href: 'createStudennt', text: 'Doc Update Requests' },
    //       ]
    //     },
    //   ]
    // },
  ],
  link: {
    title: 'Dashboard',
    href: '/SubjTeacher/dashboard'
  }
}