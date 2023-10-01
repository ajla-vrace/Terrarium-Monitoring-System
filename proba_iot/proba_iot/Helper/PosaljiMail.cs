using System.Net;
using System.Net.Mail;

namespace proba_iot.Helper
{
    public class PosaljiMail
    {

        public string To { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }


        public static void Upozorenje(string primateljEmail, float temperatura,float vlaznost)
        {
            string posiljateljEmail = "prodavnicaluna@gmail.com";
            float temperatureValue = temperatura;
            float humidityValue=vlaznost;

            string subject = "UPOZORENJE";
            DateTime currentTime = DateTime.Now;
            string formattedTime = currentTime.ToString("HH:mm, dd.MM.yyyy"); // Formatirajte vreme kako želite

            string body = $"Poštovani, <br><br>Uslovi u terarijumu su van granica normalnih vrijednosti: <br/><br/>" +
              $"- Temperatura: {temperatureValue}°C <br/>" +
              $"- Vlažnost: {humidityValue}% <br/><br/>" +
              $"Ovo upozorenje je generisano u {formattedTime}. <br/><br/>" +
              $"Preporučujemo da proverite uslove u terarijumu i preduzmete odgovarajuće korake kako biste ponovo uspostavili normalne vrijednosti temperature i vlažnosti. <br/><br/>" +
              $"Pozdrav. <br/><br/>";
             
            using (MailMessage mail = new MailMessage(posiljateljEmail, primateljEmail))
            {
                mail.Subject = subject;
                mail.Body = body;
                mail.IsBodyHtml = true;

                using (SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587))
                {
                    smtp.EnableSsl = true;
                    smtp.Credentials = new NetworkCredential(posiljateljEmail, "yvygsqnrjdmyxksu");
                    smtp.Send(mail);
                }
            }
        }

    }  
    }
