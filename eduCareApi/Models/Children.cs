namespace eduCareApi.Models
{
    public class Children
    {
        public int ID { get; set; }               // Primary Key
        public string Name { get; set; }          // Student Name
        public string Surname { get; set; }       // Student Surname
        public int? ParentID { get; set; }        // Foreign Key to Parents
        public int? AgeID { get; set; }           // Foreign Key to Ages
        public int? ClassID { get; set; }         // Foreign Key to Classes
        public bool Status { get; set; }          // Active/Inactive
    }
}
