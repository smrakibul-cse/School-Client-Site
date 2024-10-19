
import { createBrowserRouter } from "react-router-dom";


import ErrorPage from "../Components/ErrorPage/ErrorPage";
import Root from "../Layout/Root";
import Home from "../Page/Home/Home";
import Login from "../Login/Login";
import Register from "../Register/Register";
import AboutUs from "../Page/About/AboutUs";
import ReadMessage from "../Page/ReadMessage/ReadMessage";
import ImageGallery from "../Page/ImageGallery/ImageGallery";
import Video from "../Page/Video/Video";
import DashBoard from "../DashBoardControl/Dashboard";
import AdminHome from "../DashBoardControl/AdminRouter/AdminHome";
import AllUsers from "../DashBoardControl/AdminRouter/AllUsers";
import AddStudentInfo from "../AdminPanel/AddStudentInfo";
import StudentInfo from "../AdminPanel/StudentInfo";
import UpdateStudentInfo from "../AdminPanel/UpdateStudentInfo";
import AddResult from "../TeacherPanel/AddResult";
import AdminNews from "../AdminPanel/AdminNews";
import ShowNews from "../AdminPanel/ShowNews";
import UpdateNotice from "../AdminPanel/UpdateNotice";
import UserNotice from "../Page/News/UserNotice";
import ShowResult from "../TeacherPanel/ShowResult";
import ShowAdminResult from "../AdminPanel/ShowAdminResult";
import UserStudentInfo from "../Page/UserStudentInfo";
import TotalStudent from "../Page/TotalStudent";
import PublishedResult from "../AdminPanel/PublishedResult";
import SeenResult from "../Page/SeenResult";
import PageResult from "../Page/PageResult";

import TeacherHome from "../TeacherPanel/TeacherHome";
import CreateAdmitCard from "../AdminPanel/CreateAdmitCard";
import ShowAdmitCard from "../AdminPanel/ShowAdmitCard";
import UpdateAdmitCard from "../AdminPanel/UpdateAdmitCard";
import PublicAdmit from "../AdminPanel/PublicAdmit";

import ExamRoutine from "../Page/StuAdmitCard/ExamRoutine";
import ExamAdmitCard from "../Page/StuAdmitCard/ExamAdmitCard";
import Vision from "../Vision/Vision";
import Mision from "../Vision/Mision";
import Experience from "../Page/Experience/Experience";

import UploadResult from "../AdminPanel/UploadResult";
import ForgetPassword from "../Login/ForgetPassword";
import SScConner from "../Page/SscConner/SScConner";
import PrivateRoute from "./PrivateRoute";

import PublicResult from "../Page/StudentPanel/PublicResult";
import HeadTeacher from "../PublicTeacher/HeadTeacher";
import OldHeadTeacher from "../PublicTeacher/OldHeadTeacher";
import TeacherRegister from "../PublicTeacher/TeacherRegister";
import ViewTeacherInfo from "../PublicTeacher/ViewTeacherInfo";
import UpdateTeacherInformation from "../PublicTeacher/UpdateTeacherInformation";
import HomePageTeacher from "../PublicTeacher/HomePageTeacher";
import UniqueTeacherInfo from "../PublicTeacher/UniqueTeacherInfo";
import Contract from "../Page/Contract";
import AddEvent from "../AdminPanel/AddEvent";
import ShowEventAdmin from "../AdminPanel/ShowEventAdmin";
import ShowEventStudent from "../Page/Event/ShowEventStudent";
import DrownView from "../Page/DrownView/DrownView";
import AdmissionApply from "../Admission/AdmissionApply";
import DownloadedAdmissionFrom from "../Admission/DownloadedAdmissionFrom";
import AdmissionShow from "../AdminPanel/AdmissionShow";
import AdmissionFromControl from "../AdminPanel/AdmissionFromControl";
import AdmissionNotice from "../AdminPanel/AdmissionNotice";
import AdmissionData from "../AdminPanel/AdmissionData";
import PassingRate from "../TeacherPanel/PassingRate";
import PublicNotice from "../Admission/PublicNotic";
import ClassRoutine from "../Page/ClassRoutine/ClassRoutine";
import UpdateEvent from "../AdminPanel/UpdateEvent";
import ELibrary from "../Page/E-library/ELibrary";
import AddNoticeTeacher from "../AdminPanel/NoticeTeacher/AddNoticeTeacher";
import NoticeTeacher from "../AdminPanel/NoticeTeacher/NoticeTeacher";
import AdminNotice from "../TeacherPanel/AdminNotice";
import UploadedClassRoutine from "../TeacherPanel/UploadedClassRoutine";
import TEacherRoutine from "../TeacherPanel/TEacherRoutine";
import GenerateTestimonial from "../AdminPanel/GenerateTestmonial/GenerateTestimonial";
import AdminPrivate from "./AdminPrivate";
import TeacherPrivate from "./TeacherPrivate";
import ViewTestimonial from "../AdminPanel/GenerateTestmonial/ViewTestimonial";





const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>,

            },

            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/about",
                element: <AboutUs></AboutUs>,
            },
            {
                path: "/news",
                element: <UserNotice></UserNotice>,
            },
            {
                path: "/message",
                element: <ReadMessage></ReadMessage>,
            },

            {
                path: "/images",
                element: <ImageGallery></ImageGallery>,
            },
            {
                path: "/videos",
                element: <Video></Video>,
            },
            {
                path: "/allStu",
                element: <UserStudentInfo></UserStudentInfo>,
            },
            {
                path: "/total",
                element: <TotalStudent></TotalStudent>,
            },
            {
                path: "/result",
                element: <SeenResult></SeenResult>,
            },
            {
                path: "/show",
                element: <PageResult></PageResult>,
            },
            {
                path: "/publicResult",
                element: <PublicResult></PublicResult>,
            },
            {
                path: "/stuAdmit",
                element: <ExamRoutine></ExamRoutine>,
            },
            {
                path: "/admit",
                element: <ExamAdmitCard></ExamAdmitCard>,
            },
            {
                path: "/vision",
                element: <Vision></Vision>,
            },
            {
                path: "/mission",
                element: <Mision></Mision>,
            },
            {
                path: "/experience",
                element: <Experience></Experience>,
            },
            {
                path: "/allTeacher",
                element: <HomePageTeacher></HomePageTeacher>,
            },
            {
                path: "/forget",
                element: <ForgetPassword></ForgetPassword>,
            },
            {
                path: "/ssc",
                element: <SScConner></SScConner>,
            },
            {
                path: "/headTeacher",
                element: <HeadTeacher></HeadTeacher>,
            },
            {
                path: "/oldHeadTeacher",
                element: <OldHeadTeacher></OldHeadTeacher>,
            },
            {
                path: "/individualTeacher/:id",
                element: <UniqueTeacherInfo></UniqueTeacherInfo>,
                loader: ({ params }) => fetch(`https://rowmari-c-g-zaman-server.vercel.app/homePageTeacher/${params.id}`)
            },
            {
                path: "/contract",
                element: <Contract></Contract>,
            },
            {
                path: "/studentEvent",
                element: <ShowEventStudent></ShowEventStudent>,
            },
            {
                path: "/documentary",
                element: <DrownView></DrownView>,
            },
            {
                path: "/apply",
                element: <AdmissionApply></AdmissionApply>,
            },
            {
                path: "/fromDownload",
                element: <DownloadedAdmissionFrom></DownloadedAdmissionFrom>,
            },
            {
                path: "/admissionNotice",
                element: <PublicNotice></PublicNotice>,
            },
            {
                path: '/Register',
                element: <Register></Register>
            },
            {
                path: '/classRoutine',
                element: <ClassRoutine></ClassRoutine>
            },
            {
                path: '/e-library',
                element: <ELibrary></ELibrary>
            },

        ]
    },
    {
        path: 'dashBoard',
        element: <PrivateRoute><DashBoard></DashBoard></PrivateRoute>,
        children: [
            // Admin dashboard
            {
                path: 'home',
                element: <AdminPrivate><AdminHome></AdminHome></AdminPrivate>
            },
            {
                path: 'users',
                element: <AdminPrivate><AllUsers></AllUsers></AdminPrivate>
            },
            {
                path: 'studentInfo',
                element: <AdminPrivate><AddStudentInfo></AddStudentInfo></AdminPrivate>
            },
            {
                path: 'stuInfo',
                element: <AdminPrivate><StudentInfo></StudentInfo></AdminPrivate>
            },
            {
                path: 'stuInfo/update/:id',
                element: <AdminPrivate><UpdateStudentInfo /></AdminPrivate>,
                loader: ({ params }) => fetch(`https://rowmari-c-g-zaman-server.vercel.app/students/${params.id}`)
            },
            {
                path: 'showNews',
                element: <AdminPrivate><ShowNews></ShowNews></AdminPrivate>
            },
            {
                path: 'adNews',
                element: <AdminPrivate><AdminNews></AdminNews></AdminPrivate>
            },
            {
                path: 'showNews/updateNews/:id',
                element: <AdminPrivate><UpdateNotice></UpdateNotice></AdminPrivate>,
                loader: ({ params }) => fetch(`https://rowmari-c-g-zaman-server.vercel.app/news/${params.id}`)
            },
            {
                path: 'result',
                element: <AdminPrivate><ShowAdminResult></ShowAdminResult></AdminPrivate>
            },
            {
                path: 'publicResult',
                element: <AdminPrivate><PublishedResult></PublishedResult></AdminPrivate>
            },
            {
                path: 'admit',
                element: <AdminPrivate><CreateAdmitCard></CreateAdmitCard></AdminPrivate>
            },
            {
                path: 'seeAdmit',
                element: <AdminPrivate><ShowAdmitCard></ShowAdmitCard></AdminPrivate>
            },
            {
                path: 'seeAdmit/updateAdmit/:id',
                element: <AdminPrivate><UpdateAdmitCard></UpdateAdmitCard></AdminPrivate>,
                loader: ({ params }) => fetch(`https://rowmari-c-g-zaman-server.vercel.app/admitPost/${params.id}`)
            },
            {
                path: 'publicAdmit',
                element: <AdminPrivate><PublicAdmit></PublicAdmit></AdminPrivate>
            },
            {
                path: 'ssc',
                element: <AdminPrivate><UploadResult></UploadResult></AdminPrivate>
            },
            {
                path: 'addEvent',
                element: <AdminPrivate> <AddEvent></AddEvent></AdminPrivate>
            },
            {
                path: 'showEventAdmin',
                element: <AdminPrivate><ShowEventAdmin></ShowEventAdmin></AdminPrivate>
            },

            {
                path: 'admissionShow',
                element: <AdminPrivate><AdmissionShow></AdmissionShow></AdminPrivate>
            },
            {
                path: 'admissionOpen',
                element: <AdminPrivate><AdmissionFromControl></AdmissionFromControl></AdminPrivate>
            },
            {
                path: 'admissionNews',
                element: <AdminPrivate><AdmissionNotice></AdmissionNotice></AdminPrivate>
            },
            {
                path: 'showNewsData',
                element: <AdminPrivate><AdmissionData></AdmissionData></AdminPrivate>
            },
            {
                path: 'showEventAdmin/edit/:id',
                element: <AdminPrivate><UpdateEvent></UpdateEvent></AdminPrivate>,
                loader: ({ params }) => fetch(`https://rowmari-c-g-zaman-server.vercel.app/getEvent/${params.id}`)
            },
            {
                path: 'adminNoticeTeacher',
                element: <AdminPrivate><AddNoticeTeacher></AddNoticeTeacher></AdminPrivate>
            },
            {
                path: 'NoticeByTeacher',
                element: <AdminPrivate><NoticeTeacher></NoticeTeacher></AdminPrivate>
            },
            {
                path: 'testimonial',
                element: <AdminPrivate><GenerateTestimonial></GenerateTestimonial></AdminPrivate>
            },
            {
                path: 'viewTestimonial',
                element: <AdminPrivate><ViewTestimonial></ViewTestimonial></AdminPrivate>
            },


            // TeacherDashboard
            {
                path: "teacherHome",
                element: <TeacherPrivate><TeacherHome></TeacherHome></TeacherPrivate>
            },
            {
                path: "addResult",
                element: <TeacherPrivate><AddResult></AddResult></TeacherPrivate>
            },
            {
                path: "SeeResult",
                element: <TeacherPrivate><ShowResult></ShowResult></TeacherPrivate>
            },
            {
                path: "teacherRegister",
                element: <TeacherPrivate> <TeacherRegister></TeacherRegister></TeacherPrivate>
            },
            {
                path: "registerInfo",
                element: <TeacherPrivate> <ViewTeacherInfo></ViewTeacherInfo></TeacherPrivate>
            },
            {
                path: "registerInfo/updateInfo/:id",
                element: <TeacherPrivate><UpdateTeacherInformation></UpdateTeacherInformation></TeacherPrivate>,
                loader: ({ params }) => fetch(`https://rowmari-c-g-zaman-server.vercel.app/generalTeacher/${params.id}`)

            },

            {
                path: "passingRate",
                element: <TeacherPrivate><PassingRate></PassingRate></TeacherPrivate>
            },
            {
                path: "teacherNotice",
                element: <TeacherPrivate><AdminNotice></AdminNotice></TeacherPrivate>
            },
            {
                path: "teacherClassRoutine",
                element: <TeacherPrivate><UploadedClassRoutine></UploadedClassRoutine></TeacherPrivate>
            },
            {
                path: "teacherRoutineShow",
                element: <TeacherPrivate><TEacherRoutine></TEacherRoutine></TeacherPrivate>
            },

        ]
    }
]);

export default router;