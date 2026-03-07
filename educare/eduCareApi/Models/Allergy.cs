namespace eduCareApi.Models
{
    public class Allergy
    {
        public int ID { get; set; }           // Primary Key
        public string Name { get; set; }      // Allergy name (required)
        public string? Details { get; set; }  // Optional details about the allergy
    }
}
