using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Stone
{
    private int type; // 0: Villager, 1: Official
    private int num;
    public Stone(int type = 0, int num = 0)
    {
        this.type = type;
        this.num = num;
    }

    public int getType()
    {
        return type;
    }
    public int getNum() {
        return num;

    }
    public void setNum(int add)
    {
        this.num = this.num + add;
    }
}

public class TileStone
{
    private List<Stone> v;
    public TileStone()
    {
        v = new List<Stone>();
    }

    public void addStone(int type, int num)
    {
        for (int i = 0; i < v.Count; i++)
        {
            if (v[i].getType() == type)
            {
                v[i].setNum(num);
                return;
            }
        }
        v.Add(new Stone(type, num));
    }
}

public class MainCam : MonoBehaviour
{
    private int num;
    [SerializeField] private GameObject Tile_;
    [SerializeField] private GameObject NTile_;
    [SerializeField] private GameObject Stone_;

    private TileStone[] board = new TileStone[12];
    private List<GameObject> GOblst;

    private void Awake()
    {
        GameObject makePlayer = GameObject.FindGameObjectWithTag("numPlayer") as GameObject;
        num = makePlayer.GetComponent<NumPlayer>().num;
        Destroy(makePlayer);
        Debug.Log(num);
    }

    private void Start()
    {
        GOblst = new List<GameObject>();
        GameBoard();
        InitBoard();
    }

    public List<GameObject>  getTile(int i)
    {
        return GOblst[i];
    }

    private void GameBoard()
    {
        int ID = 0;
        float x = -4.91f;
        float y1 = 0.26f;
        float gap = 2.47f;
        float y2 = -2.19f;

        for (int i = 0; i < 12; i++)
        {
            if (i <= 4)
            {
                GameObject obj = Instantiate(Tile_, new Vector2(x + gap * i, y1), Quaternion.identity);
                obj.name = ID.ToString();
                SpriteRenderer sr = obj.GetComponent<SpriteRenderer>();
                if (sr == null)
                {
                    sr = obj.AddComponent<SpriteRenderer>(); // Thêm SpriteRenderer nếu chưa có
                }

                // Đặt thứ tự hiển thị
                sr.sortingOrder = 2;
                GOblst.Add(obj);
            }
            else if (i == 5)
            {
                GameObject obj = Instantiate(NTile_, new Vector2(-7.18f, -0.92f), Quaternion.identity);
                obj.name = ID.ToString();
                SpriteRenderer sr = obj.GetComponent<SpriteRenderer>();
                if (sr == null)
                {
                    sr = obj.AddComponent<SpriteRenderer>(); // Thêm SpriteRenderer nếu chưa có
                }

                // Đặt thứ tự hiển thị
                sr.sortingOrder = 2;
                GOblst.Add(obj);
            }
            else if (i <= 10)
            {
                GameObject obj = Instantiate(Tile_, new Vector2(x + (i - 6) * gap, y2), Quaternion.identity);
                obj.name = ID.ToString();
                SpriteRenderer sr = obj.GetComponent<SpriteRenderer>();
                if (sr == null)
                {
                    sr = obj.AddComponent<SpriteRenderer>(); // Thêm SpriteRenderer nếu chưa có
                }

                // Đặt thứ tự hiển thị
                sr.sortingOrder = 2;
                GOblst.Add(obj);
            }
            else if (i == 11)
            {
                GameObject obj = Instantiate(NTile_, new Vector2(7.22f, -0.92f), Quaternion.identity);
                obj.name = ID.ToString();
                SpriteRenderer sr = obj.GetComponent<SpriteRenderer>();
                if (sr == null)
                {
                    sr = obj.AddComponent<SpriteRenderer>(); // Thêm SpriteRenderer nếu chưa có
                }

                // Đặt thứ tự hiển thị
                sr.sortingOrder = 2;
                GOblst.Add(obj);
            }
            ID++;
        }
    }

    private void InitBoard()
    {
        for (int i = 0; i < 12; i++)
        {
            if (i == 5 || i == 11)
            {
                board[i] = new TileStone();
                board[i].addStone(1, 1);
            }
            else
            {
                board[i] = new TileStone();
                board[i].addStone(0, 5);
            }
        }
    }
}
