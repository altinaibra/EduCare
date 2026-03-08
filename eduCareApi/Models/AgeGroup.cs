namespace eduCareApi.Models
{
    public class AgeGroup
    {
        public int Id { get; set; }               // Primary Key
        public string AgeRange { get; set; }      // Age range (e.g., "1-2 vjeç")
        public int NumberOfClasses { get; set; }  // Number of classes for this age group
        public string EducatorName { get; set; }  // Name of the educator
        public bool Status { get; set; }        // Active status
    }
}