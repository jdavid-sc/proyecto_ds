if($('his_codigoCups_response') != 0 ||$('his_tipoDocumentoPaciente_response') != 0 || $('codigoUnico_response')!= 0 ||$('his_procedencia_response') != 0 ||$('his_prioridad_response') != 0 || $('codigoEps_response')!= 0 || $('his_codigoSede_response')!= 0||$('Auth_response')!= 200){
    logger.info("Hola, revisa aca arriba donde dice TRANSFORMERS en la parte de respuesta que error es");
    elerrores.$('error');
    
}else{
//====================================================================================================================
//conexion base de datos del RIS
//====================================================================================================================

var dbConn = DatabaseConnectionFactory.createDatabaseConnection($('ris_dbDriver'),$('ris_conPath'),$('ris_dbName'),$('ris_dbPassword'));pd_current

//====================================================================================================================
//fin conexion base de datos del RIS
// inicio mapeo datos demograficos del paciente. 
//====================================================================================================================

var his_tipoDocumentoPaciente   =       $('his_tipoDocumentoPaciente');
var his_documentoPaciente       =       $('his_documentoPaciente');
var his_nombre1Paciente         =       $('his_nombre1Paciente');
var his_nombre2Paciente         =       $('his_nombre2Paciente');
var his_apellido1Paciente         =       $('his_apellido1Paciente');
var his_apellido2Paciente         =       $('his_apellido2Paciente');
var his_telefonoPaciente          =       $('his_telefonoPaciente');
var his_celularPaciente         =       $('his_celularPaciente');
var his_direccionPaciente       =       $('his_direccionPaciente');
var his_sexoPaciente            =       $('his_sexoPaciente');
var his_fechaNacimientoPaciente =       $('his_fechaNacimientoPaciente');
var his_zonaResidencialPaciente =       $('his_zonaResidencialPaciente');
var his_rhPaciente                =       $('his_rhPaciente');
var his_correoPaciente            =       $('his_correoPaciente');
var his_url                   =         $('his_url');


var pd_id_person = UUIDGenerator.getUUID();
var pd_current = DateUtil.getCurrentDate('yyyy-MM-dd HH:mm:ss');
var pd_age_year = pd_date_birth != null ? getAge(pd_date_birth)[0] : -1;

//====================================================================================================================
//fin mapeo datos demograficos del paciente. 
// inicio mapeo datos de la orden
//====================================================================================================================

var his_codigoUnico             = $('his_codigoUnico');
var his_procedencia             = $('his_procedencia');
var his_prioridad              = $('his_prioridad');
var his_nombreEps               = $('his_nombreEps');
var his_nitEps                  = $('his_nitEps');
var his_idEps                   = $('his_idEps');
var his_codMunicipio            = $('his_codMunicipio');
var  his_nombreMunicipio        = $('his_nombreMunicipio');
var  his_codDepartamento        = $('his_codDepartamento');
var  his_nombreDepartamento     = $('his_nombreDepartamento');
var his_codigoCups              = $('his_codigoCups');
var his_nombreCups              = $('his_nombreCups');
var id_study_list               = $('id_study_list');
var his_observacion             = $('his_observacion');
var his_justifiacion            = $('his_justifiacion');
var his_fechaSolicitud          = $('his_fechaSolicitud');
var his_nombresMedicoRemitente  = $('his_nombresMedicoRemitente');
var his_documentoMedicoRemitente       = $('his_documentoMedicoRemitente');
var his_apellidosMedicoAsignado = $('his_apellidosMedicoAsignado');
var his_documentoMedicoAsigandov= $('his_documentoMedicoAsigando');
var his_codigoMedicoAsignado    = $('his_codigoMedicoAsignado');
var his_idMedicoRemitente       = $('his_idMedicoRemitente');
var his_codigoCie10             = $('his_codigoCie10');
var his_nombreCie10             = $('his_nombreCie10');
var his_modalidad               = $('his_modalidad');
var his_sala1                    = $('sala');
var his_nombreSede              = $('his_nombreSede');
var his_codigoSede              = $('his_codigoSede');
var his_contraste               = $('his_contraste');
var his_nombreProcedencia               = $('his_nombreProcedencia');
var pat_contact_name            = '';
//====================================================================================================================
//fin mapeo datos de la orden
// inicio obtencion de appointment code, internal order code y definicion de URL de ordenes 
//====================================================================================================================

var fecha_actual = $('fecha_actual');
var sequence = $('sequencia_appointment'); // cambiar la secuencia segun el cliente
var sequenceQeury = "SELECT nextval('"+sequence+"');";
var appoinmentCode = dbConn.executeCachedQuery(sequenceQeury);               
appoinmentCode.next();
var app_appointment_code =  $('id_appointment') + appoinmentCode.getString('nextval');

var int_order_code = '10';
var sequenceQeury2 = "SELECT nextval('codigo_internal_order');"; 
var orderCode = dbConn.executeCachedQuery(sequenceQeury2);               
orderCode.next();
var int_order_code =  'OM' + orderCode.getString('nextval');
var int_order_url = '/var/www/html/web/../web/bundles/utilities/images/sinorden.pdf';
  
//====================================================================================================================
//fin obtencion de appointment code, internal order code y definicion de URL de ordenes 
// inicio insercion de la orden -> insertar o actualizar paciente en person data 
//====================================================================================================================

if($('his_tipoOrden') == 'NW'){
   
var controlQuery = "SELECT 1 FROM person_data WHERE document = p_1_";       
controlQuery = setParameter(1,controlQuery,his_documentoPaciente,1);
var insertControl = dbConn.executeCachedQuery(controlQuery);

   if(!insertControl.next()){
           var query = "INSERT INTO person_data (id_person,document, first_name, second_name, first_last_name, second_last_name, current, sex, blood_type, id_document_type, full_name, date_birth, telephone, age_year, address, email, residential_zone) "+
                   "VALUES (p_1_ ,p_2_ ,p_3_ ,p_4_ ,p_5_ ,p_6_ ,p_7_ ,p_8_ ,p_9_ ,p_10_,p_11_,p_12_,p_13_,p_14_,p_15_,p_16_,p_17_)";

           query = setParameter(1,query,pd_id_person,1);
           query = setParameter(2,query,his_documentoPaciente,1);  
           query = setParameter(3,query,his_nombre1Paciente,1);  
           query = setParameter(4,query,his_nombre2Paciente,1);  
           query = setParameter(5,query,his_apellido1Paciente,1);  
           query = setParameter(6,query,his_apellido2Paciente,1);  
           query = setParameter(7,query,pd_current,1);  
           query = setParameter(8,query,his_sexoPaciente,0);  
           query = setParameter(9,query,his_rhPaciente,1);  // rh del paciente 
           query = setParameter(10,query,his_tipoDocumentoPaciente,1);
           query = setParameter(11, query, his_nombre1Paciente+" "+his_nombre2Paciente+" "+his_apellido1Paciente+" "+his_apellido2Paciente+" - "+ his_documentoPaciente, 1);
           query = setParameter(12,query,his_fechaNacimientoPaciente,1);
           query = setParameter(13,query,his_telefonoPaciente,1);
           query = setParameter(14,query,pd_age_year,1);
           query = setParameter(15,query,his_direccionPaciente,1);
           query = setParameter(16,query,his_correoPaciente,1);
           query = setParameter(17,query,his_zonaResidencialPaciente,1);
//logger.info(query);

         var result = dbConn.executeUpdate(query);
   } else {

           //Inicio obtención de id_person
           var queryIdPerson = "SELECT id_person FROM person_data WHERE document = p_1_";   
           queryIdPerson = setParameter(1,queryIdPerson,his_documentoPaciente,1);
           var updateIdPerson = dbConn.executeCachedQuery(queryIdPerson);
   
           if(updateIdPerson.next()){
             pd_id_person = updateIdPerson.getString("id_person");
        }
           //Fin obtención de id_person
   
           var query = "UPDATE person_data set first_name = p_1_, "+
               "second_name = p_2_,"+
               "first_last_name = p_3_,"+
               "second_last_name = p_4_,"+
               "id_document_type = p_5_,"+
               "full_name = p_11_," +
               "date_birth = p_6_,"+
               "email = p_7_,"+
               "address = p_8_,"+
               "telephone = p_9_,"+
               "cellphone = p_12_,"+
               "sex = p_13_,"+
               "blood_type = p_14_,"+
               "residential_zone = p_15_"+
               "where document = p_10_";

           query = setParameter(1,query,his_nombre1Paciente,1);
           query = setParameter(2,query,his_nombre2Paciente,1);
           query = setParameter(3,query,his_apellido1Paciente,1);
           query = setParameter(4,query,his_apellido2Paciente,1);
           query = setParameter(5,query,his_tipoDocumentoPaciente,1);
           query = setParameter(6,query,his_fechaNacimientoPaciente,1);
           query = setParameter(7,query,his_correoPaciente,1);
           query = setParameter(8,query,his_direccionPaciente,1);
           query = setParameter(9,query,his_telefonoPaciente,1);
           query = setParameter(10,query,his_documentoPaciente,1);
           query = setParameter(11, query, his_nombre1Paciente+" "+his_nombre2Paciente+" "+his_apellido1Paciente+" "+his_apellido2Paciente+" - "+ his_documentoPaciente, 1);
           query = setParameter(12,query,his_celularPaciente,1);
           query = setParameter(13,query,his_sexoPaciente,1);
           query = setParameter(14,query,0,1); // rh del paciente 
         query = setParameter(15,query,his_zonaResidencialPaciente,1);
           var result = dbConn.executeUpdate(query);
   }    


//====================================================================================================================
//fin insert o act de los datos demograficos del paciente en person data 
// inicio obtencion o creacion de paciente en la tabla patient
//====================================================================================================================
   var pat_id_patient = UUIDGenerator.getUUID();
   var controlQuery = "SELECT 1 FROM patient INNER JOIN person_data on patient.id_person = person_data.id_person WHERE person_data.document = p_1_";
   controlQuery = setParameter(1,controlQuery,his_documentoPaciente,1);
   var insertControl = dbConn.executeCachedQuery(controlQuery);

   if(!insertControl.next()){
       var query = "INSERT INTO patient (id_patient, municipality_code, current, contact_name,id_person) VALUES (p_1_ ,p_2_ ,p_3_ ,p_4_,p_5_)";
    
       query = setParameter(1,query,pat_id_patient,1);
       query = setParameter(2,query,his_codMunicipio,1);  
       query = setParameter(3,query,fecha_actual,1);  
       query = setParameter(4,query,pat_contact_name,1);
       query = setParameter(5,query,pd_id_person,1);  

       var result = dbConn.executeUpdate(query);
   }
//====================================================================================================================
//fin obtencion o creacion de paciente en la tabla patient
// inicio obtencion o creacion de internal order
//====================================================================================================================

       var controlQuery = "SELECT 1 as count_internalOrder FROM internal_order WHERE internal_order_code = p_1_";
       controlQuery = setParameter(1,controlQuery,int_order_code,1);
       var insertControlInternalOrder = dbConn.executeCachedQuery(controlQuery);

       if(!insertControlInternalOrder.next()){
           var clinical_data =1 ;  // definir para que se utiliza este dato

           var query = "INSERT INTO internal_order (internal_order_code, physical_order_url,current,doctor_referring,have_clinical_data,codigo_cie10,id_out_site_user) "+
                   "VALUES (p_1_ ,p_2_ ,p_3_,p_4_,p_5_,p_6_,p_7_)";
    
           query = setParameter(1,query,int_order_code,1);
           query = setParameter(2,query,int_order_url,1);  
           query = setParameter(3,query,fecha_actual,1); 
           query = setParameter(4,query,his_idMedicoRemitente,1); 
           query = setParameter(5,query,clinical_data,1); 
           query = setParameter(6,query,his_codigoCie10,1); 
           query = setParameter(7,query,his_idMedicoRemitente,1);  

           var result = dbConn.executeUpdate(query);
       }
   
//====================================================================================================================
//fin obtencion o creacion de internal order
//===================================================================================================================

//=======================================================================================================================
// tomar la sala segun la modalidad y la sede
//=======================================================================================================================
 
   var Sala_response = '200'
   var roomhis= his_sala1;
  
   var controlRoom = "select room_code from room where room_code = p_1_" 
   controlRoom = setParameter(1,controlRoom, roomhis,0);

   logger.info("Query que se va a ejecutar: " + controlRoom);
   
   var insertRoom = dbConn.executeCachedQuery(controlRoom);
   if(!insertRoom.next()){
      // var roomS = 7;
      // var id_headquarter = 'ca0fb4a1-5426-4094-8e29-8dda3066c12f';
      var Sala_response = '509'
      globalMap.put("Sala_response",Sala_response)
      //no existe una sala para esa moadlidad en la sede
      elerrores.$('error');
   }else{
       //logger.info('estos si entraron'+' '+new_int_order_code+' '+insertRoom.getInt("room_code"));
       
       var roomS = insertRoom.getInt("room_code");
   }


   var his_sala = roomS;

//=================================================================================================================
// inicio Definicion de estado segun la modalidad // Definicion de tecnologo que realiza la toma de los estudios
//====================================================================================================================
         var Parameter_EstudiesToRadiologist = true;
       
       if(Parameter_EstudiesToRadiologist == true){  // si hay modalidades directo al radiologo este parametro debe ir en true.
               var modality = his_modalidad;
               var app_appointment_status = '';
               var tecnologo = "turno";

               var controlUser= "select Us.id as UserIdTechnologist from user_sonata as Us WHERE us.username = p_1_"
               controlUser = setParameter(1,controlUser,tecnologo,1);

               var insertUser= dbConn.executeCachedQuery(controlUser);
               insertUser.next()
           
               if (modality == 'US') {           // si existen mas modalidades que deban ir directo al radiologo se deben agreagr al este if 
                   app_appointment_status = 5;
               } else if (modality != 'US') {
               app_appointment_status = 15;
            } else {
                   app_appointment_status = 15;
               }
               
               var app_datetime_asistencial = DateUtil.getCurrentDate('yyyy-MM-dd HH:mm:ss');
               var app_user_assistencial = insertUser.getInt("UserIdTechnologist");
       }else{
               var app_user_assistencial = null;
               var app_datetime_asistencial = null;
               var app_appointment_status = 15;
       }

//====================================================================================================================
//fin Definicion de estado segun la modalidad // Definicion de tecnologo que realiza la toma de los estudios
// inicio Insertion - appointment
//====================================================================================================================


   var controlQuery = "SELECT 1 as count_appointment FROM appointment WHERE appointment_code = p_1_";

       controlQuery = setParameter(1,controlQuery,app_appointment_code,1);

   var insertControlAppointment = dbConn.executeCachedQuery(controlQuery);
       
   var controlQuery2 = "SELECT id_patient FROM patient INNER JOIN person_data on patient.id_person = person_data.id_person WHERE person_data.document = p_1_"    
       
       controlQuery2 = setParameter(1,controlQuery2,his_documentoPaciente,1);

   var insertControl2 = dbConn.executeCachedQuery(controlQuery2);
       
       insertControl2.next()

   var controlQuery3 = "SELECT internal_order_code FROM internal_order WHERE internal_order_code = p_1_"    
       
       controlQuery3 = setParameter(1,controlQuery3,int_order_code,1);

   var insertControl3 = dbConn.executeCachedQuery(controlQuery3);
       
       insertControl3.next()

       var query = "INSERT INTO appointment (appointment_code, appointment_date, id_patient, current, appointment_status, id_eps, id_provenance_date, id_priority, id_user_reading, internal_order_code, id_user_receipt) "+
                   "VALUES (p_1_ ,p_2_,p_6_ ,p_7_ ,p_8_ ,p_9_ ,p_10_ ,p_11_,p_12_,p_13_,p_14_)";
    
       query = setParameter(1,query,app_appointment_code,1);
       query = setParameter(2,query,his_fechaSolicitud,1);  
       //query = setParameter(4,query,app_datetime_asistencial,1);  
       //query = setParameter(5,query,app_user_assistencial,0);  
       query = setParameter(6,query,insertControl2.getString('id_patient'),1);  
       query = setParameter(7,query,his_fechaSolicitud,1);
       query = setParameter(8,query,app_appointment_status,0);
       query = setParameter(9,query,his_idEps,1);
       query = setParameter(10,query,his_procedencia,0);
       query = setParameter(11,query,his_prioridad,0);
       query = setParameter(12,query,app_user_assistencial,0);
       query = setParameter(13,query,int_order_code,1);
       query = setParameter(14,query,2,1);  //------ aca poner el usuario que registrs (normalmente el usuario TURNO)
     
       var result = dbConn.executeUpdate(query);
     

           
//====================================================================================================================
//fin Insertion - appointment
// inicio  Insertion - room_appointment_study_receipt 
//====================================================================================================================

       var std_study_detail_code = UUIDGenerator.getUUID();  
       var rasr_id_room_appointment_study_receipt = UUIDGenerator.getUUID();
       var rasr_auto_validated = null;

       var st_study_code = UUIDGenerator.getUUID();
       var st_study_name = his_nombreCups;
       if(st_study_name ==''){
           st_study_name = 'ESTUDIO SIN NOMBRE';
           }

           var query = "INSERT INTO room_appointment_study_receipt (id_room_appointment_study_receipt, appointment_code, room_code, current, auto_validated) "+
                       "VALUES (p_1_ ,p_2_ ,p_3_ ,p_4_,p_5_)";
        
           query = setParameter(1,query,rasr_id_room_appointment_study_receipt,1);
           query = setParameter(2,query,app_appointment_code,1);  
           query = setParameter(3,query,his_sala,1);
           query = setParameter(4,query,fecha_actual,1);
           query = setParameter(5,query,rasr_auto_validated,0);
        //   query = setParameter(6,query,his_codigoUnico,1);
           logger.info(query);
           var result = dbConn.executeUpdate(query);

//====================================================================================================================
//fin Insertion - room_appointment_study_receipt 
// inicio  Insertion - study
//====================================================================================================================

           var query2 = "INSERT INTO study (study_code, study_name, id_modality, current, id_room_appointment_study_receipt, cups, clinical,id_study_list ) "+
                       "VALUES (p_1_ ,p_2_ ,p_3_ ,p_4_ ,p_5_,p_6_,p_7_,p_8_)";
        
           query2 = setParameter(1,query2,st_study_code,1);
           query2 = setParameter(2,query2,st_study_name,1);  
           query2 = setParameter(3,query2,his_modalidad,1);  
           query2 = setParameter(4,query2,fecha_actual,1);
           query2 = setParameter(5,query2,rasr_id_room_appointment_study_receipt,1);
           query2 = setParameter(6,query2,his_codigoCups,1);
           query2 = setParameter(7,query2,his_url,1);
           query2 = setParameter(8,query2,id_study_list,1);
           
logger.info(query2);
           var result2 = dbConn.executeUpdate(query2);
                

//====================================================================================================================
//fin Insertion - study
// inicio  Insertion o Actualizacion - ti_hisris
//====================================================================================================================

var controlQuery = "SELECT 1 FROM ti_hisris WHERE codigounico = p_1_ ";

controlQuery = setParameter(1, controlQuery,  his_codigoUnico, 1);
var insertControl = dbConn.executeCachedQuery(controlQuery);
if (!insertControl.next()) {

   var query = "INSERT INTO ti_hisris (codigounico, origen, codser, tipide, nroide, nombre, apell1, apell2, telefo, celula, direcc, sexo, zresid, tipmed, medico, codact, nomact, obsord, fnacim, correo, fechas, esthis,  estris,  docrem, nomrem, lectura,   estcam,  depnom, muncod, munnom, nommed, nomser, priori, codemp, nomemp, modalidad, nombre_sede, fuente, appointment_code, justif) " +
   "VALUES (p_1_,p_2_,p_3_,p_4_,p_5_,p_6_,p_7_,p_8_,p_9_,p_10_,p_11_,p_12_,p_13_,p_14_,p_15_,p_16_,p_17_,p_18_,p_19_,p_20_,p_21_,p_22_,p_23_,p_24_,p_25_,p_26_,p_28_,p_30_,p_31_,p_32_,p_33_,p_34_,p_35_,p_36_,p_37_,p_38_,p_40_,p_42_,p_43_,p_44_)";

   query = setParameter(1, query, his_codigoUnico, 1);
   query = setParameter(2, query, 'I', 1);
   query = setParameter(3, query, his_procedencia, 1); // falta por definir 
   query = setParameter(4, query, his_tipoDocumentoPaciente, 1);
   query = setParameter(5, query, his_documentoPaciente, 1);
   query = setParameter(6, query, his_nombre1Paciente +' '+ his_nombre2Paciente, 1);
   query = setParameter(7, query, his_apellido1Paciente, 1);
   query = setParameter(8, query, his_apellido2Paciente, 1);
   query = setParameter(9, query, his_telefonoPaciente, 1);
   query = setParameter(10, query,his_celularPaciente, 1);
   query = setParameter(11, query,his_direccionPaciente, 1);
   query = setParameter(12, query,his_sexoPaciente, 1);
   query = setParameter(13, query,$('hir_interfaz_zona_residencial'), 1); //falta por definir
   query = setParameter(14, query, 'E', 1); // tampoco esta definido tipode medico interno externo
   query = setParameter(15, query, his_nombresMedicoRemitente, 1);
   query = setParameter(16, query, his_codigoCups, 1);
   query = setParameter(17, query, his_nombreCups +' '+ his_codigoCups, 1);
   query = setParameter(18, query, his_observacion, 1);
   query = setParameter(19, query, his_fechaNacimientoPaciente, 1);
   query = setParameter(20, query, his_correoPaciente, 1);
   query = setParameter(21, query, his_fechaSolicitud, 1);
   query = setParameter(22, query, 'OR', 1); // para que este disponible en solicitudes HIS
   query = setParameter(23, query, app_appointment_status, 1);
   query = setParameter(24, query, $('his_documentoMedicoRemitente'), 1);
   query = setParameter(25, query, $('his_nombresMedicoRemitente'), 1);
   query = setParameter(26, query, 'f', 1);
   query = setParameter(28, query, 'f', 1);
   query = setParameter(30, query, his_nombreDepartamento, 1);
   query = setParameter(31, query, his_codMunicipio, 1);
   query = setParameter(32, query, his_nombreMunicipio, 1);
   query = setParameter(33, query, his_nombresMedicoRemitente, 1);
   query = setParameter(34, query, his_nombreProcedencia, 1); // creo  q es procedencia 
   query = setParameter(35, query, his_prioridad, 1);
   query = setParameter(36, query, his_nitEps, 1);
   query = setParameter(37, query, his_nombreEps, 1);
   query = setParameter(38, query, his_modalidad, 1);
 //  query = setParameter(39, query, null, 1);   //concepto en null no enviado 
   query = setParameter(40, query, his_nombreSede, 1);
  // query = setParameter(41, query, his_codigoSede, 1);
   query = setParameter(42, query, $('idorigen'), 1);
   query = setParameter(43,query,app_appointment_code,1); 
   query = setParameter(44,query,his_url,1);  
   
   logger.info(query);

       
   var result = dbConn.executeUpdate(query);

}
/*
else{

   var queryIdPerson = "SELECT id FROM ti_hisris WHERE codigounico = p_1_";
   queryIdPerson = setParameter(1, queryIdPerson,  his_codigoUnico, 1);
   var updateIdPerson = dbConn.executeCachedQuery(queryIdPerson);

   if (updateIdPerson.next()) {
       id_ti_hisris = updateIdPerson.getInt("id");
   }

    var query = "UPDATE ti_hisris set "+
                   "codigounico = p_1_, " + 
                   "origen = p_2_, " + 
                   "codser = p_3_, " + 
                   "tipide = p_4_, " + 
                   "nroide = p_5_, " + 
                   "nombre = p_6_, " + 
                   "apell1 = p_7_, " +  
                   "apell2 = p_8_, " +  
                   "telefo = p_9_, " +  
                   "celula = p_10_, " +  
                   "direcc = p_11_, " +  
                   "sexo = p_12_, " + 
                   "zresid = p_13_, " +  
                   "tipmed = p_14_, " +  
                   "medico = p_15_, " +  
                   "codact = p_16_, " +  
                   "nomact = p_17_, " +  
                   "fnacim = p_19_, " +  
                   "correo = p_20_, " +  
                   "fechas = p_21_, " +  
                  "esthis = p_22_, " +  
                   "estris = p_23_, " +   
                   "docrem = p_24_, " +  
                   "nomrem = p_25_, " +  
                   "lectura = p_26_, " +  
                   "appointment_code = p_27_, " +   
                   "estcam = p_28_, " +  
                   "depcod = p_29_, " +  
                   "muncod = p_31_, " +  
                   "nommed = p_33_, " +  
                   "nomser = p_34_, " +  
                   "priori = p_35_, " +  
                   "codemp = p_36_, " +  
                   "nomemp = p_37_, " +  
                   "modalidad = p_38_, " +  
                   "concepto = p_39_, " +  
                   "nombre_sede = p_40_, " +  
                   "codigo_sede = p_41_ " +
                   "where id = p_42_";

       query = setParameter(1, query, his_codigoUnico, 1);
       query = setParameter(2, query, 'I', 1);
       query = setParameter(3, query, $('hir_interfaz_via_ingreso'), 1);
       query = setParameter(4, query, his_tipoDocumentoPaciente, 1);
       query = setParameter(5, query, his_documentoPaciente, 1);
       query = setParameter(6, query, his_nombre1Paciente.trim() +' '+his_nombre2Paciente.trim(), 1);
       query = setParameter(7, query, his_apellido1Paciente, 1);
       query = setParameter(8, query, his_apellido2Paciente, 1);
       query = setParameter(9, query, his_telefonoPaciente, 1);
       query = setParameter(10, query,his_celularPaciente, 1);
       query = setParameter(11, query,his_direccionPaciente, 1);
       query = setParameter(12, query,his_sexoPaciente, 1);
       query = setParameter(13, query,$('hir_interfaz_zona_residencial'), 1);
       query = setParameter(14, query, 'E', 1);
       query = setParameter(15, query, his_nombresMedicoRemitente, 1);
       query = setParameter(16, query, his_codigoCups, 1);
       query = setParameter(17, query, his_nombreCups, 1);
       query = setParameter(19, query, his_fechaNacimientoPaciente, 1);
       query = setParameter(20, query, his_correoPaciente, 1);
       query = setParameter(21, query, his_fechaSolicitud, 1);
       query = setParameter(22, query, 'PR', 1);
       query = setParameter(23, query, '15', 1);
       query = setParameter(24, query, his_documentoMedicoRemitente, 1);
       query = setParameter(25, query, his_nombresMedicoRemitente, 1);
       query = setParameter(26, query, 'f', 1);
       query = setParameter(27, query, app_appointment_code, 1);
       query = setParameter(28, query, 'f', 1);
       query = setParameter(29, query, $('hir_interfaz_codigo_departamento'), 1);
       query = setParameter(31, query, his_codMunicipio, 1);
       query = setParameter(33, query, his_nombresMedicoRemitente, 1);
       query = setParameter(34, query, $('hir_interfaz_via_ingreso_nombre'), 1);
       query = setParameter(35, query, his_prioridad, 1);
       query = setParameter(36, query, his_nitEps, 1);
       query = setParameter(37, query, his_nombreEps, 1);
       query = setParameter(38, query, his_modalidad, 1);
       query = setParameter(39, query, null, 1);  // no esta definido
       query = setParameter(40, query, his_nombreSede, 1);
       query = setParameter(41, query, his_codigoSede, 1);
       query = setParameter(42, query, id_ti_hisris, 1);
logger.info(query);

        var result = dbConn.executeUpdate(query);

   }

*/


//====================================================================================================================
//fin  Insertion o Actualizacion - ti_hisris
// inicio preparacion de inforamacion e insertion - Modality Work list 
//====================================================================================================================

           var names = his_nombre1Paciente + '^' + his_nombre2Paciente;
           var last_names = his_apellido1Paciente + '^' + his_apellido2Paciente; 
           var pd_date_birth = his_fechaNacimientoPaciente != '' ? DateUtil.convertDate('yyyyMMdd', 'yyyy-MM-dd HH:mm:ss', his_fechaNacimientoPaciente) : pd_current;
           var pd_date = his_fechaNacimientoPaciente.trim();
           var pd_date_birth = pd_date.substr(0,10);
           var pd_date_birth = pd_date_birth.split('-').join('');
           var sexo = his_sexoPaciente;
           var st_study_name = st_study_name.split(' ').join('^');


                               // si la modalidad es diferente de EC se crea el registro en la tabla de MWL
       if(modality != 'EC'){
               var query = "INSERT INTO modality_worklist (sex, birth_date, names, last_names, patient_document, appointment_code, study_name, id_room, headquarter_code) " + 
                           "VALUES (p_1_,p_2_,p_3_,p_4_,p_5_,p_6_,p_7_,p_8_,p_9_)";
   
               query = setParameter(1,query,sexo,1);
               query = pd_date_birth != null ? setParameter(2,query,pd_date_birth,1) : setParameter(2,query,pd_date_birth,0); 
               query = setParameter(3,query,names,1);
               query = setParameter(4,query,last_names,1);
               query = setParameter(5,query,his_documentoPaciente,1);
               query = setParameter(6,query,app_appointment_code,1);
               query = setParameter(7,query,st_study_name,1);
               query = setParameter(8,query,his_sala,1);
               query = setParameter(9,query,his_codigoSede,1);
   
               var result = dbConn.executeUpdate(query);
       }
//====================================================================================================================
//fin  preparacion de inforamacion e insertion - Modality Work list 
// inicio preparacion de inforamacion e insertion - en schedule
//====================================================================================================================

   var sequenceQuery = "SELECT nextval('schedule_id_schedule_seq');"; 
   var idSchedule = dbConn.executeCachedQuery(sequenceQuery);               
   idSchedule.next();
   var id_schedule =  idSchedule.getString('nextval');

   var type_schedule = "A";
   var hours = his_fechaSolicitud;
   var hours = hours.substr(11, 19);


   var query = "INSERT INTO schedule (id_schedule, date_start, date_end, hours_start, hours_end, appointment_code, type_schedule, date_creator, id_room) " +
               "VALUES (p_1_,p_2_,p_3_,p_4_,p_5_,p_6_,p_7_,p_8_,p_9_)";

   query = setParameter(1,query,id_schedule,1);
   query = setParameter(2,query,his_fechaSolicitud,1);
   query = setParameter(3,query,his_fechaSolicitud,1);
   query = setParameter(4,query,hours,1);
   query = setParameter(5,query,hours,1);
   query = setParameter(6,query,app_appointment_code,1);
   query = setParameter(7,query,type_schedule,1);
   query = setParameter(8,query,his_fechaSolicitud,1);
   query = setParameter(9,query,his_sala,1);

   var result = dbConn.executeUpdate(query);

   dbConn.close();

}
//====================================================================================================================
//fin  aca  termina el flujo de los estudios cuando el tipo de solicitud es NW.
// si se recibe un tipo de solicitud diferente a NW este cancelara el estduio en nuestro sistema 
//====================================================================================================================
else { 

   var QueryappCode = "SELECT appointment_code FROM ti_hisris WHERE codigounico = p_1_"    
       QueryappCode = setParameter(1,QueryappCode,his_codigoUnico,1);

   var InsertQueryappCode = dbConn.executeCachedQuery(QueryappCode);
   if(!InsertQueryappCode.next()){
       var InsertQueryappCode = 'CP32637';
     } else{
         var InsertQueryappCode = InsertQueryappCode.getString('appointment_code');
           }
   
   var query = "UPDATE appointment set appointment_status = '0'"+
               "where appointment_code = p_1_ AND appointment_status <> '11'";
   query = setParameter(1,query,InsertQueryappCode,1);
   var result = dbConn.executeUpdate(query);


   var query = "UPDATE ti_hisris set esthis = 'CA'"+
               "where appointment_code = p_1_ AND esthis <> 'RE'" ;
   query = setParameter(1,query,InsertQueryappCode,1);
   var result = dbConn.executeUpdate(query);


   
dbConn.close();
}

//====================================================================================================================
// DB Connection Close
//====================================================================================================================

dbConn.close();

//====================================================================================================================
// END
//====================================================================================================================

}

//====================================================================================================================
// Utilities
//====================================================================================================================

/**
* Transform from an unique field containing the full name to 4 different fields
* @param  {[string]} fullName [value of full name]
* @return {[array]}          [array of full name divided in first Name, second Name, first Lastname and seconf Lastname]
*/
function nameFormat(readName) {

   var nameArray = [];

   var nameRegex = /([a-zA-Z]+)/g;
   var result = readName.match(nameRegex);
   var resultParsed = [];

   if (result != null) {

       for (var x in result) {

           var parse = nameRegex.exec(result[x]);
           resultParsed.push(parse[1]);
           nameRegex.lastIndex = 0;

       }

       switch (resultParsed.length) {

           case 1:
               nameArray.push(resultParsed[0]);
               nameArray.push("");
               nameArray.push("");
               nameArray.push("");
               break;
           case 2:
               nameArray.push(resultParsed[0]);
               nameArray.push("");
               nameArray.push(resultParsed[1]);
               nameArray.push("");
               break;
           case 3:
               nameArray.push(resultParsed[0]);
               nameArray.push(resultParsed[1]);
               nameArray.push(resultParsed[2]);
               nameArray.push("");
               break;
           case 4:
               nameArray.push(resultParsed[0]);
               nameArray.push(resultParsed[1]);
               nameArray.push(resultParsed[2]);
               nameArray.push(resultParsed[3]);
               break;
           default:
               nameArray.push(resultParsed[0]);
               nameArray.push(resultParsed[1]);
               nameArray.push(resultParsed[2]);
               nameArray.push("");
     
       }

   } else {

       nameArray.push("N.N");
       nameArray.push("N.N");
       nameArray.push("N.N");
       nameArray.push("N.N");

   }

   return nameArray;

}

/**
* Replace query paramters
* @param {[int]} index [index for replacemente]
* @param {[string]} text  [string where the replacement will happen]
* @param {[string]} value [string to replace]
* @param {[int]} type  [0 - for Integers, 1- for Varchars]
*/
function setParameter(index,text,value,type){
   
   var replacementRegex = new RegExp("p_"+index+"_", "i");
   
   switch(type){
   
       case 0:
           return text.replace(replacementRegex,value);
           break;
       case 1:
           return text.replace(replacementRegex,"'"+value+"'");
           break;
           
   };
   
}

/**
* [Get age in Years and Months from a born date]
* @param  {[string]} ageString [Birth date]
* @return {[array]}           [Years|Months]
*/
function getAge(ageString) {

   var fullAge = [];
   var nowDate = new Date();

   var dateRegex = /(\d{4})-(\d{2})-(\d{2})/g;
   var result = dateRegex.exec(ageString);

   var ageYear = parseInt(nowDate.getFullYear() - 1) - parseInt(result[1]);
   var ageMonth = parseInt(nowDate.getMonth() + 1) - parseInt(result[2]);

   if (ageMonth < 0) ageMonth += 12;

   fullAge.push(ageYear);
   fullAge.push(ageMonth);

   return fullAge;

}

/**
* Check if register has the accesion number in Hiruko's expected format
* @param  {[string]} code [accesion number read from PACS]
* @return {[boolean]}      [false if not matched, true if matched]
*/
function getNumberFromCode(code) {

   var accessionCodeTemplate = /^A(\d*)$/g;
   
   var catchedCode = accessionCodeTemplate.exec(code);

   return catchedCode == null ? false : true;

}



/**
* Replace query paramters
* @param {[int]} index [index for replacemente]
* @param {[string]} text  [string where the replacement will happen]
* @param {[string]} value [string to replace]
* @param {[int]} type  [0 - for Integers, 1- for Varchars]
*/
function setParameter(index,text,value,type){
   
   var replacementRegex = new RegExp("p_"+index+"_", "i");
   
   switch(type){
   
       case 0:
           return text.replace(replacementRegex,value);
           break;
       case 1:
           return text.replace(replacementRegex,"'"+value+"'");
           break;
           
   };
   
}


/**
* [Get age in Years and Months from a born date]
* @param  {[string]} ageString [Birth date]
* @return {[array]}           [Years|Months]
*/
function getAge(ageString) {

   var fullAge = [];
   var nowDate = new Date();

   var dateRegex = /(\d{4})-(\d{2})-(\d{2})/g;
   var result = dateRegex.exec(ageString);

   var ageYear = parseInt(nowDate.getFullYear() - 1) - parseInt(result[1]);
   var ageMonth = parseInt(nowDate.getMonth() + 1) - parseInt(result[2]);

   if (ageMonth < 0) ageMonth += 12;

   fullAge.push(ageYear);
   fullAge.push(ageMonth);

   return fullAge;

}