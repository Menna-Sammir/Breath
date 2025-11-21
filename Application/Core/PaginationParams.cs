namespace Application.Core;

public class PaginationParams<TCursor>
{
    private const int MaxPageSize = 50;
    public TCursor? Cursor { get; set; }
    private int _PageSize = 3;
    public int PageSize
    {
        get => _PageSize;
        set => _PageSize = (value > MaxPageSize ? MaxPageSize : value);
    }
}
