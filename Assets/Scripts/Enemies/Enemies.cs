using UnityEngine;
using UnityEngine.AI;

[RequireComponent(typeof(NavMeshAgent))]
public class Enemy : MonoBehaviour
{
    public float health = 100f;
    public float damage = 10f;
    public float attackDistance = 2f;

    private Transform player;
    private NavMeshAgent agent;

    void Start()
    {
        player = GameObject.FindGameObjectWithTag("Player").transform;
        agent = GetComponent<NavMeshAgent>();
    }

    void Update()
    {
        if(player == null)
            return;

        agent.SetDestination(player.position);

        float distance = Vector3.Distance(transform.position, player.position);

        if(distance <= attackDistance)
        {
            Attack();
        }
    }

    void Attack()
    {
        PlayerHealth health = player.GetComponent<PlayerHealth>();

        if(health != null)
        {
            health.TakeDamage(damage * Time.deltaTime);
        }
    }

    public void TakeDamage(float damageAmount)
    {
        health -= damageAmount;

        if(health <= 0)
        {
            Destroy(gameObject);
        }
    }
}