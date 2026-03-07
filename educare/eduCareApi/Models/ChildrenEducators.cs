namespace eduCareApi.Models
{
    public class ChildrenEducators
    {

        public int ID { get; set; }          // Primary Key
        public int EducatorID { get; set; }  // Foreign Key to Educators
        public int ChildID { get; set; }     // Foreign Key to Children
    }
}
