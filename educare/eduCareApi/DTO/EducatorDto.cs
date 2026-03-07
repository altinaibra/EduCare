namespace eduCareApi.DTO
{
    public class EducatorsDto
    {
        public int ID { get; set; }               // Primary Key
        public int? UserID { get; set; }          // Foreign Key to Users table
        public int? SpecializimetID { get; set; } // Foreign Key to Specializations
        public bool Status { get; set; }          // Active/Inactive
        public int K1 { get; set; }               // Custom field K1
        public int K2 { get; set; }               // Custom field K2
        public int K3 { get; set; }               // Custom field K3
    }
}